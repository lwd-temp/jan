import { Fragment } from 'react'

import { Tooltip } from '@janhq/joi'

import { motion as m } from 'framer-motion'

import { useAtom } from 'jotai'
import {
  MessageCircleIcon,
  SettingsIcon,
  MonitorIcon,
  LayoutGridIcon,
  SquareCodeIcon,
} from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import LogoMark from '@/containers/Brand/Logo/Mark'

import { MainViewState } from '@/constants/screens'

import { useMainViewState } from '@/hooks/useMainViewState'

import styles from './ribbonNav.module.scss'

import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'

const primaryMenus = [
  {
    name: 'Thread',
    icon: <MessageCircleIcon size={20} />,
    state: MainViewState.Thread,
  },
  {
    name: 'Hub',
    icon: <LayoutGridIcon size={20} />,
    state: MainViewState.Hub,
  },
]

const secondaryMenus = [
  {
    name: 'Local API Server',
    icon: <SquareCodeIcon size={20} />,
    state: MainViewState.LocalServer,
  },
  {
    name: 'System Monitor',
    icon: <MonitorIcon size={20} />,
    state: MainViewState.SystemMonitor,
  },
  {
    name: 'Settings',
    icon: <SettingsIcon size={20} />,
    state: MainViewState.Settings,
  },
]

export default function RibbonNav() {
  const { mainViewState, setMainViewState } = useMainViewState()
  const [serverEnabled] = useAtom(serverEnabledAtom)

  const onMenuClick = (state: MainViewState) => {
    if (mainViewState === state) return
    if (serverEnabled && state === MainViewState.Thread) return
    setMainViewState(state)
  }

  return (
    <div className={styles.ribbonNav}>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div>
          {isMac && (
            <div className="mb-2 mt-10">
              <LogoMark width={28} height={28} className="mx-auto" />
            </div>
          )}

          {primaryMenus
            .filter((primary) => !!primary)
            .map((primary, i) => {
              const isActive = mainViewState === primary.state
              return (
                <div className="relative flex p-2" key={i}>
                  <Tooltip
                    side="right"
                    hidden={isActive}
                    trigger={
                      <Fragment>
                        <div
                          data-testid={primary.name}
                          className={twMerge(
                            styles.icon,
                            isActive && styles.iconIsActive
                          )}
                          onClick={() => onMenuClick(primary.state)}
                        >
                          {primary.icon}
                        </div>
                        {isActive && (
                          <m.div
                            className={styles.statePointer}
                            layoutId="active-state-primary"
                          />
                        )}
                      </Fragment>
                    }
                    content={
                      serverEnabled &&
                      primary.state === MainViewState.Thread ? (
                        <span>
                          Threads are disabled while the server is running
                        </span>
                      ) : (
                        <span>{primary.name}</span>
                      )
                    }
                  />
                </div>
              )
            })}
        </div>

        <div>
          {secondaryMenus
            .filter((secondary) => !!secondary)
            .map((secondary, i) => {
              const isActive = mainViewState === secondary.state
              return (
                <div className="relative flex p-2" key={i}>
                  <Tooltip
                    side="right"
                    hidden={isActive}
                    trigger={
                      <Fragment>
                        <div
                          data-testid={secondary.name}
                          className={twMerge(
                            styles.icon,
                            isActive && styles.iconIsActive
                          )}
                          onClick={() => onMenuClick(secondary.state)}
                        >
                          {secondary.icon}
                        </div>
                        {isActive && (
                          <m.div
                            className={styles.statePointer}
                            layoutId="active-state-secondary"
                          />
                        )}
                      </Fragment>
                    }
                    content={<span>{secondary.name}</span>}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
