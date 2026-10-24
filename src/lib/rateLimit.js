// Rate limiting and duplicate-submission guards for the contact endpoint.
//
// With UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN set, state lives in
// Upstash Redis and is shared by every serverless instance. Without them it
// falls back to process memory, which only covers requests that reach the
// same instance — fine for local development, not a real limit on Vercel.

const memory = new Map();

export const rateLimitBackend = () =>
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? "upstash" : "memory";

async function upstash(commands) {
  const url = process.env.UPSTASH_REDIS_REST_URL.replace(/\/$/, "");
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Upstash responded ${response.status}`);
  const results = await response.json();
  const failed = results.find((item) => item?.error);
  if (failed) throw new Error(failed.error);
  return results.map((item) => item.result);
}

function memoryEntry(key) {
  const entry = memory.get(key);
  if (entry && entry.expiresAt <= Date.now()) {
    memory.delete(key);
    return undefined;
  }
  return entry;
}

// Falls back to memory if Upstash is unreachable, so the limiter never
// blocks real enquiries on its own.
async function withFallback(remote, local) {
  if (rateLimitBackend() === "upstash") {
    try {
      return await remote();
    } catch (error) {
      console.error("Rate limiter unavailable, using memory fallback:", error?.message);
    }
  }
  return local();
}

/** True when `id` has made more than `max` calls within the window. */
export async function isRateLimited(id, { max = 5, windowMs = 10 * 60 * 1000, prefix = "rl:contact" } = {}) {
  const key = `${prefix}:${id}`;
  return withFallback(
    async () => {
      // Create the window with its expiry only if absent, then count. INCR
      // keeps the TTL, so the window ends windowMs after the first hit.
      const [, count] = await upstash([
        ["SET", key, "0", "PX", String(windowMs), "NX"],
        ["INCR", key],
      ]);
      return Number(count) > max;
    },
    () => {
      const entry = memoryEntry(key);
      if (!entry) {
        memory.set(key, { count: 1, expiresAt: Date.now() + windowMs });
        return false;
      }
      entry.count += 1;
      return entry.count > max;
    }
  );
}

/** Claims `id` once; later claims within ttlMs return false. */
export async function claimOnce(id, { ttlMs = 30 * 60 * 1000, prefix = "once:contact" } = {}) {
  const key = `${prefix}:${id}`;
  return withFallback(
    async () => {
      const [result] = await upstash([["SET", key, "1", "PX", String(ttlMs), "NX"]]);
      return result === "OK";
    },
    () => {
      if (memoryEntry(key)) return false;
      memory.set(key, { count: 1, expiresAt: Date.now() + ttlMs });
      return true;
    }
  );
}

/** Releases a claim so a failed submission can be retried. */
export async function releaseClaim(id, { prefix = "once:contact" } = {}) {
  const key = `${prefix}:${id}`;
  memory.delete(key);
  if (rateLimitBackend() === "upstash") {
    try {
      await upstash([["DEL", key]]);
    } catch (error) {
      console.error("Could not release submission claim:", error?.message);
    }
  }
}
