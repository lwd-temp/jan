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

import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'

const primaryMenus = [
  {
    name: 'Thread',
    icon: (
      <MessageCircleIcon
        size={20}
        className={twMerge('flex-shrink-0 text-muted-foreground')}
      />
    ),
    state: MainViewState.Thread,
  },
  {
    name: 'Hub',
    icon: (
      <LayoutGridIcon
        size={20}
        className="flex-shrink-0 text-muted-foreground"
      />
    ),
    state: MainViewState.Hub,
  },
]

const secondaryMenus = [
  {
    name: 'Local API Server',
    icon: (
      <SquareCodeIcon
        size={20}
        className="flex-shrink-0 text-muted-foreground"
      />
    ),
    state: MainViewState.LocalServer,
  },
  {
    name: 'System Monitor',
    icon: (
      <MonitorIcon size={20} className="flex-shrink-0 text-muted-foreground" />
    ),
    state: MainViewState.SystemMonitor,
  },
  {
    name: 'Settings',
    icon: (
      <SettingsIcon size={20} className="flex-shrink-0 text-muted-foreground" />
    ),
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
    <div className="relative flex w-[72px] flex-shrink-0 flex-col border-r border-border bg-background py-4">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div>
            {isMac && (
              <div className="unselect mb-2 mt-10">
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
                      trigger={
                        <Fragment>
                          <div
                            data-testid={primary.name}
                            className={twMerge(
                              'relative flex w-full flex-shrink-0 cursor-pointer items-center justify-center',
                              isActive && 'z-10'
                            )}
                            onClick={() => onMenuClick(primary.state)}
                          >
                            {primary.icon}
                          </div>
                          {isActive && (
                            <m.div
                              className="absolute inset-0 left-0 h-full w-full rounded-md bg-gray-200 dark:bg-secondary"
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
                      trigger={
                        <>
                          <div
                            data-testid={secondary.name}
                            className={twMerge(
                              'relative flex w-full flex-shrink-0 cursor-pointer items-center justify-center',
                              isActive && 'z-10'
                            )}
                            onClick={() => onMenuClick(secondary.state)}
                          >
                            {secondary.icon}
                          </div>
                          {isActive && (
                            <m.div
                              className="absolute inset-0 left-0 h-full w-full rounded-md bg-gray-200 dark:bg-secondary"
                              layoutId="active-state-secondary"
                            />
                          )}
                        </>
                      }
                      content={<span>{secondary.name}</span>}
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
