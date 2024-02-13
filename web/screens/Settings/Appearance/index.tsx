import { Button } from '@janhq/joi'
import { useAtomValue, useAtom } from 'jotai'
import { twMerge } from 'tailwind-merge'

import { useThemes } from '@/hooks/useThemes'

import styles from '../settings.module.scss'

import {
  janTheme,
  themeAtom,
  themeOptionsAtom,
} from '@/helpers/atoms/Theme.atom'

export default function AppearanceOptions() {
  const [themeState, setThemeState] = useAtom(themeAtom)
  const themeOption = useAtomValue(themeOptionsAtom)
  const { setTheme } = useThemes()

  return (
    <div className="block w-full">
      <div className={twMerge('!border-none first:!pt-0', styles.listItem)}>
        <div className={styles.listItemWrapper}>
          <h6 className={styles.listItemTitle}>Themes</h6>
          <p className={styles.listItemDescription}>
            Choose the theme color used throughout the app.
          </p>

          {themeOption.map((themeName, i) => {
            const isThemeActive = themeState === themeName
            return (
              <Button
                theme={isThemeActive ? 'primary' : 'secondary'}
                key={i}
                className="mr-4 mt-4 capitalize"
                onClick={() => {
                  if (!isThemeActive) {
                    setThemeState(themeName)
                    localStorage.setItem(janTheme, themeName)
                    setTheme(themeName)
                  }
                }}
              >
                {themeName.replaceAll('-', ' ')}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
