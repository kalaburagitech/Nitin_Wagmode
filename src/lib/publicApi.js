// Async accessors for page content. Content is static (see src/data); the
// promise-based interface is kept so components can switch to a CMS later
// without changing their call sites.
import {
  fallbackAbout,
  fallbackHero,
  fallbackPortfolio,
  fallbackResume,
  fallbackServices,
  fallbackSettings,
} from "./publicContent";

export const fetchHeroContent = () => Promise.resolve(fallbackHero);
export const fetchPortfolioContent = () => Promise.resolve(fallbackPortfolio);
export const fetchResumeContent = () => Promise.resolve(fallbackResume);
export const fetchServicesContent = () => Promise.resolve(fallbackServices);
export const fetchAboutContent = () => Promise.resolve(fallbackAbout);
export const fetchSiteSettings = () => Promise.resolve(fallbackSettings);
