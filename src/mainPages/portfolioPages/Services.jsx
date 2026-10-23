'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeaderBanner from '@/global/HeaderBanner'
import { useTheme } from '@/components/ThemeProvider'
import { fetchServicesContent } from '@/lib/publicApi'
import { fallbackServices } from '@/lib/publicContent'
import { profile } from '@/data/profile'
import { ServicesSkeleton } from '@/components/SkeletonLoaders'

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [servicesData, setServicesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDarkMode } = useTheme()

  const defaultServicesData = fallbackServices

  useEffect(() => {
    let cancelled = false
    const loadServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchServicesContent().catch(() => defaultServicesData)
        if (!cancelled) {
          setServicesData({
            title: data?.title || defaultServicesData.title,
            subtitle: data?.subtitle || defaultServicesData.subtitle,
            description: data?.description || defaultServicesData.description,
            services:
              Array.isArray(data?.services) && data.services.length > 0
                ? data.services
                : defaultServicesData.services,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load services')
          setServicesData(defaultServicesData)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadServices()
    return () => { cancelled = true }
  }, [defaultServicesData])

  if (loading) {
    return (
      <>
        <HeaderBanner title="Services" />
        <ServicesSkeleton />
      </>
    )
  }

  if (error && !servicesData) {
    return (
      <section id="services" className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
        <HeaderBanner title="Services" />
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">!</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              Unable to Load Services
            </h3>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (!servicesData || !servicesData.services) return null

  const active = servicesData.services[activeService]

  return (
    <section
      id="services"
      className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}
    >
      <HeaderBanner
        title="Services"
        subtitle="Frontend engineering for web and mobile products."
      />

      <div className="container-custom">

        {/* ── Section header ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: 'var(--primary-3)' }}
            >
              <span
                className="block w-6 h-px"
                style={{ backgroundColor: 'var(--primary-3)' }}
              />
              {servicesData.subtitle}
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ color: 'var(--text-heading)' }}
            >
              {servicesData.title}
            </h2>
          </div>

          <p
            className="max-w-sm text-sm leading-relaxed md:text-right"
            style={{ color: 'var(--text-muted)' }}
          >
            {servicesData.description}
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          className={`grid grid-cols-3 divide-x rounded-2xl mb-16 overflow-hidden border ${
            isDarkMode
              ? 'border-white/10 divide-white/10 bg-white/[0.03]'
              : 'border-slate-200 divide-slate-200 bg-white shadow-sm'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { value: `${servicesData.services.length}`, label: 'Service Tracks' },
            { value: 'React', label: 'Core Stack' },
            { value: `${profile.experienceYears}+`, label: 'Years Experience' },
          ].map((s) => (
            <div key={s.label} className="py-6 px-8 text-center">
              <p
                className="text-3xl font-extrabold font-russo"
                style={{ color: 'var(--primary)' }}
              >
                {s.value}
              </p>
              <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Main layout: sidebar list + detail panel ── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">

          {/* Left: stacked service rows */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            {servicesData.services.map((service, index) => (
              <motion.button
                key={`${service.name}-${index}`}
                onClick={() => setActiveService(index)}
                className={`group w-full text-left rounded-2xl border px-6 py-5 transition-all duration-300 relative overflow-hidden ${
                  activeService === index
                    ? 'border-primary'
                    : isDarkMode
                    ? 'border-white/10 hover:border-white/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{
                  background:
                    activeService === index
                      ? isDarkMode
                        ? 'linear-gradient(135deg, rgba(135,80,247,0.18), rgba(135,80,247,0.06))'
                        : 'linear-gradient(135deg, rgba(135,80,247,0.08), rgba(135,80,247,0.03))'
                      : isDarkMode
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.95)',
                }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Accent bar */}
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                  animate={{ scaleY: activeService === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className="text-[11px] font-bold font-russo tabular-nums shrink-0"
                      style={{ color: activeService === index ? 'var(--primary)' : 'var(--text-muted)' }}
                    >
                      {service.num || String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-base font-bold truncate transition-colors duration-200"
                      style={{
                        color:
                          activeService === index
                            ? 'var(--primary)'
                            : 'var(--text-heading)',
                      }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  <motion.span
                    className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300"
                    style={{
                      borderColor:
                        activeService === index ? 'var(--primary)' : 'var(--border)',
                      color:
                        activeService === index ? 'var(--primary)' : 'var(--text-muted)',
                      backgroundColor:
                        activeService === index
                          ? isDarkMode
                            ? 'rgba(135,80,247,0.15)'
                            : 'rgba(135,80,247,0.08)'
                          : 'transparent',
                    }}
                    animate={{ rotate: activeService === index ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ↗
                  </motion.span>
                </div>

                {/* Tags — visible on mobile always, hidden on lg (shown in detail) */}
                <div className="flex flex-wrap gap-2 mt-3 lg:hidden">
                  {(service.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        color: 'var(--primary)',
                        background: isDarkMode
                          ? 'rgba(135,80,247,0.14)'
                          : 'rgba(135,80,247,0.09)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description on mobile */}
                <AnimatePresence>
                  {activeService === index && (
                    <motion.p
                      className="mt-3 text-sm leading-relaxed lg:hidden"
                      style={{ color: 'var(--text-muted)' }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>

          {/* Right: detail panel — desktop only */}
          <motion.div
            className="hidden lg:block sticky top-28"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                className={`rounded-[28px] border p-10 relative overflow-hidden ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.04]'
                    : 'border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {/* Decorative gradient blob */}
                <div
                  className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{ background: 'var(--primary)' }}
                />

                {/* Number badge */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl font-russo text-sm font-bold"
                    style={{
                      color: 'white',
                      background: 'var(--primary)',
                    }}
                  >
                    {active?.num || String(activeService + 1).padStart(2, '0')}
                  </span>

                  {/* Step indicator dots */}
                  <div className="flex items-center gap-2 mt-1">
                    {servicesData.services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveService(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === activeService ? '24px' : '8px',
                          height: '8px',
                          background:
                            i === activeService
                              ? 'var(--primary)'
                              : isDarkMode
                              ? 'rgba(255,255,255,0.2)'
                              : 'rgba(0,0,0,0.15)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <h3
                  className="text-2xl font-extrabold leading-tight mb-4"
                  style={{ color: 'var(--text-heading)' }}
                >
                  {active?.name}
                </h3>

                <div
                  className="w-10 h-[3px] rounded-full mb-6"
                  style={{ backgroundColor: 'var(--primary)' }}
                />

                <p
                  className="text-sm leading-[1.85] mb-8"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {active?.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(active?.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                      style={{
                        color: 'var(--primary)',
                        background: isDarkMode
                          ? 'rgba(135,80,247,0.14)'
                          : 'rgba(135,80,247,0.09)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-3 mt-10 pt-8 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}>
                  <button
                    onClick={() => setActiveService((p) => Math.max(0, p - 1))}
                    disabled={activeService === 0}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 disabled:opacity-30"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-heading)',
                    }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveService((p) =>
                        Math.min(servicesData.services.length - 1, p + 1)
                      )
                    }
                    disabled={activeService === servicesData.services.length - 1}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30"
                    style={{
                      background: 'var(--primary)',
                      color: 'white',
                    }}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}