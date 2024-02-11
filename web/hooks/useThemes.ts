import { getJanDataFolderPath, joinPath, fs } from '@janhq/core'

import { useSetAtom } from 'jotai'

import jsonToCssVar from '@/utils/jsonToCss'

import {
  themeOptionsAtom,
  themeAtom,
  janTheme,
  defaultTheme,
} from '@/helpers/atoms/Theme.atom'

const test = async (theme: string) => {
  const userSpace = await getJanDataFolderPath()
  const filePath = await joinPath(['themes'])

  if (!filePath) return
  const fullPath = await joinPath([userSpace, filePath, theme, 'theme.json'])
  const dir = await fs.readFileSync(fullPath, 'utf8')
  const json = await JSON.parse(dir)
  const headTag = document.getElementsByTagName('head')[0]
  const styleTag = document.createElement('style')
  styleTag.innerHTML = `${jsonToCssVar.convert({ json })}`
  headTag.appendChild(styleTag)
}

export async function useThemesProviders() {
  const setThemes = useSetAtom(themeOptionsAtom)
  const setTheme = useSetAtom(themeAtom)
  const userSpace = await getJanDataFolderPath()
  const filePath = await joinPath(['themes'])

  // First time set default theme
  if (!localStorage.getItem(janTheme)) {
    localStorage.setItem(janTheme, defaultTheme)
    setTheme(defaultTheme)
    test(defaultTheme)
  } else {
    setTheme(localStorage.getItem(janTheme) ?? '')
    test(localStorage.getItem(janTheme) ?? '')
  }

  if (!filePath) return
  const fullPath = await joinPath([userSpace, filePath])
  const dir = await fs.readdirSync(fullPath)
  if (dir) setThemes(dir.filter((x: string) => x !== '.DS_Store'))
}

export function useThemes() {
  return { test }
}
