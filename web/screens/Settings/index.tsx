/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'

import { motion as m } from 'framer-motion'

import { twMerge } from 'tailwind-merge'

import Advanced from '@/screens/Settings/Advanced'
import AppearanceOptions from '@/screens/Settings/Appearance'
import ExtensionCatalog from '@/screens/Settings/CoreExtensions'

import Models from '@/screens/Settings/Models'

import { SUCCESS_SET_NEW_DESTINATION } from './Advanced/DataFolder'

import styles from './settings.module.scss'

const SettingsScreen = () => {
  const [activeStaticMenu, setActiveStaticMenu] = useState('My Models')
  const [menus, setMenus] = useState<any[]>([])
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const menu = ['My Models', 'My Settings', 'Advanced Settings']
    if (typeof window !== 'undefined' && window.electronAPI) {
      menu.push('Extensions')
    }
    setMenus(menu)
  }, [])

  const [activePreferenceExtension, setActivePreferenceExtension] = useState('')

  const handleShowOptions = (menu: string) => {
    switch (menu) {
      case 'Extensions':
        return <ExtensionCatalog />

      case 'My Settings':
        return <AppearanceOptions />

      case 'Advanced Settings':
        return <Advanced />

      case 'My Models':
        return <Models />
    }
  }

  useEffect(() => {
    if (localStorage.getItem(SUCCESS_SET_NEW_DESTINATION) === 'true') {
      setActiveStaticMenu('Advanced Settings')
      localStorage.removeItem(SUCCESS_SET_NEW_DESTINATION)
    }
  }, [])

  return (
    <div className={styles.settings} data-testid="testid-setting-description">
      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        <ResizablePanel
          minSize={16}
          maxSize={40}
          defaultSize={22}
          className={twMerge(isMobile && '!flex-auto')}
        >
          <ScrollArea
            className={twMerge(
              styles.leftPanel,
              'whitespace-pre md:h-full md:whitespace-normal'
            )}
          >
            <div className="px-3 py-4 md:px-6">
              {menus.map((menu, i) => {
                const isActive = activeStaticMenu === menu
                return (
                  <div
                    key={i}
                    className="relative mx-2.5 my-0.5 inline-flex py-2  md:mx-0 md:block"
                  >
                    <div
                      onClick={() => {
                        setActiveStaticMenu(menu)
                        setActivePreferenceExtension('')
                      }}
                      className="block w-full cursor-pointer"
                    >
                      <span className="relative z-10 font-medium">{menu}</span>
                    </div>
                    {isActive && (
                      <m.div
                        className={styles.menuActive}
                        layoutId="settings-active-static-menu"
                      />
                    )}
                  </div>
                )
              })}
            </div>
            {isMobile && <ScrollBar orientation="horizontal" />}
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle className={styles.resizeHandler} disabled={isMobile} />
        <ResizablePanel>
          <ScrollArea className="h-full w-full">
            <div className="px-4 pb-4 pt-2 md:px-6 md:pt-4">
              {handleShowOptions(activeStaticMenu || activePreferenceExtension)}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default SettingsScreen
