'use client'

import { PropsWithChildren } from 'react'

// import { ThemeProvider } from 'next-themes'

import { motion as m } from 'framer-motion'

// import { useBodyClass } from '@/hooks/useBodyClass'

import { useThemesProviders } from '@/hooks/useThemes'
import { useUserConfigs } from '@/hooks/useUserConfigs'

export default function ThemeWrapper({ children }: PropsWithChildren) {
  const [config] = useUserConfigs()

  // useBodyClass(config.primaryColor || 'primary-yellow')
  useThemesProviders()

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        },
      }}
    >
      {children}
    </m.div>
    // <ThemeProvider attribute="class" enableSystem>
    // </ThemeProvider>
  )
}
