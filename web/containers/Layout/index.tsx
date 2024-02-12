import React, { PropsWithChildren, useEffect } from 'react'

import { useTheme } from 'next-themes'

import { motion as m } from 'framer-motion'

import BottomBar from '@/containers/BottomBar'
import RibbonNav from '@/containers/RibbonNav'
import TopBar from '@/containers/TopBar'

import { MainViewState } from '@/constants/screens'

import { useMainViewState } from '@/hooks/useMainViewState'

import { SUCCESS_SET_NEW_DESTINATION } from '@/screens/Settings/Advanced/DataFolder'

import styles from './layout.module.scss'

const BaseLayout = (props: PropsWithChildren) => {
  const { children } = props
  const { mainViewState, setMainViewState } = useMainViewState()

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme as string)
  }, [setTheme, theme])

  useEffect(() => {
    if (localStorage.getItem(SUCCESS_SET_NEW_DESTINATION) === 'true') {
      setMainViewState(MainViewState.Settings)
    }
  }, [setMainViewState])

  return (
    <div className={styles.layoutWrapper}>
      <TopBar />
      <RibbonNav />
      <div className="relative top-10 flex h-[calc(100vh-80px)] w-full overflow-hidden">
        <div className="w-full">
          <m.div
            key={mainViewState}
            initial={{ opacity: 0, y: -8 }}
            className="h-full"
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            {children}
          </m.div>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default BaseLayout
