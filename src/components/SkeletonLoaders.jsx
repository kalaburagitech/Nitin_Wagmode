'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'

// Base Skeleton Component with shimmer effect
export const Skeleton = ({ className = '' }) => {
  const { isDarkMode } = useTheme()

  return (
    <motion.div
      className={`${className} ${
        isDarkMode
          ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800'
          : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'
      } rounded-lg`}
      animate={
        isDarkMode
          ? { backgroundPosition: ['0% 0%', '100% 0%'] }
          : { backgroundPosition: ['0% 0%', '100% 0%'] }
      }
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ backgroundSize: '200% 100%' }}
    />
  )
}

// About Page Skeleton
export const AboutSkeleton = () => {
  const { isDarkMode } = useTheme()
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50'

  return (
    <section className={`py-[100px] ${bgColor}`}>
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-[60px]">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-1 w-16 mx-auto mb-6" />
        </div>

        {/* Stats Grid Skeleton */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Skeleton className="h-12 w-12 mx-auto mb-3" />
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Section Skeleton */}
        <div className="grid md:grid-cols-2 gap-[60px] mb-[60px]">
          <div>
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-3 w-3/4 mb-8" />
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section Skeleton */}
        <div>
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Portfolio Page Skeleton
export const PortfolioSkeleton = () => {
  const { isDarkMode } = useTheme()
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50'

  return (
    <section className={`py-[100px] ${bgColor}`}>
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-[60px]">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-1 w-16 mx-auto" />
        </div>

        {/* Filter Buttons Skeleton */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="h-10 w-28 rounded-full"
            />
          ))}
        </motion.div>

        {/* Project Cards Skeleton */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-3xl overflow-hidden p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Skeleton className="h-64 w-full mb-4 rounded-2xl" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Services Page Skeleton
export const ServicesSkeleton = () => {
  const { isDarkMode } = useTheme()
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50'

  return (
    <section className={`py-[100px] ${bgColor}`}>
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-[60px]">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-1 w-16 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        {/* Highlights Skeleton */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-5 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-6 w-3/4" />
            </motion.div>
          ))}
        </motion.div>

        {/* Service Cards Skeleton */}
        <motion.div
          className="grid lg:grid-cols-2 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-7 min-h-[260px] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Skeleton className="h-12 w-12 rounded-full mb-4" />
              <Skeleton className="h-6 w-2/3 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Contact Page Skeleton
export const ContactSkeleton = () => {
  const { isDarkMode } = useTheme()
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50'

  return (
    <section className={`py-[100px] ${bgColor}`}>
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-[60px]">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-1 w-16 mx-auto" />
        </div>

        {/* Contact Info and Form Skeleton */}
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Contact Info Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <Skeleton className="h-8 w-8 rounded-full mb-3" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Resume Page Skeleton
export const ResumeSkeleton = () => {
  const { isDarkMode } = useTheme()
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50'

  return (
    <section className={`py-[100px] ${bgColor}`}>
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-[60px]">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-1 w-16 mx-auto" />
        </div>

        {/* Resume Sections Skeleton */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3].map((section) => (
            <motion.div
              key={section}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: section * 0.1 }}
            >
              <Skeleton className="h-8 w-40 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <Skeleton className="h-5 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-3" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
