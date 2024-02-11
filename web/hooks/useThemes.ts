import { getJanDataFolderPath, joinPath, fs } from '@janhq/core'

import { useSetAtom } from 'jotai'

import jsonToCssVar from '@/utils/jsonToCss'

import {
  themeOptionsAtom,
  themeAtom,
  janTheme,
  defaultTheme,
} from '@/helpers/atoms/Theme.atom'

const setTheme = async (theme: string) => {
  const userSpace = await getJanDataFolderPath()
  const filePath = await joinPath(['themes'])
  if (!filePath) return
  const fullPath = await joinPath([userSpace, filePath, theme, 'theme.json'])
  const dir = await fs.readFileSync(fullPath, 'utf8')
  const json = await JSON.parse(dir)
  const headTag = document.getElementsByTagName('head')[0]
  const styleTag = document.createElement('style')
  const oldTheme = document.getElementById('janTheme')
  if (oldTheme) {
    oldTheme.remove()
  }
  styleTag.innerHTML = `${jsonToCssVar.convert({ json })}`
  styleTag.setAttribute('id', 'janTheme')
  headTag.appendChild(styleTag)
}

export async function useThemesProviders() {
  const setThemeOptions = useSetAtom(themeOptionsAtom)
  const setThemeState = useSetAtom(themeAtom)
  const userSpace = await getJanDataFolderPath()
  const filePath = await joinPath(['themes'])

  // First time set default theme
  if (!localStorage.getItem(janTheme)) {
    localStorage.setItem(janTheme, defaultTheme)
    setThemeState(defaultTheme)
    setTheme(defaultTheme)
  } else {
    setThemeState(localStorage.getItem(janTheme) ?? '')
    setTheme(localStorage.getItem(janTheme) ?? '')
  }

  if (!filePath) return
  const fullPath = await joinPath([userSpace, filePath])
  const dir = await fs.readdirSync(fullPath)
  if (dir) setThemeOptions(dir.filter((x: string) => x !== '.DS_Store'))
}

export function useThemes() {
  return { setTheme }
}
