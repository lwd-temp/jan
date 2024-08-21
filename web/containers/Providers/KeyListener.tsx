'use client'

import { Fragment, ReactNode, useEffect } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { MainViewState } from '@/constants/screens'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'

import {
  mainViewStateAtom,
  showLeftPanelAtom,
  showRightPanelAtom,
} from '@/helpers/atoms/App.atom'
import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'
import {
  activeThreadAtom,
  modalActionThreadAtom,
  ThreadModalAction,
} from '@/helpers/atoms/Thread.atom'

type Props = {
  children: ReactNode
}

export default function KeyListener({ children }: Props) {
  const setShowLeftPanel = useSetAtom(showLeftPanelAtom)
  const setShowRightPanel = useSetAtom(showRightPanelAtom)
  const [mainViewState, setMainViewState] = useAtom(mainViewStateAtom)
  const { requestCreateNewThread } = useCreateNewThread()
  const assistants = useAtomValue(assistantsAtom)
  const activeThread = useAtomValue(activeThreadAtom)
  const setModalActionThread = useSetAtom(modalActionThreadAtom)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const prefixKey = isMac ? e.metaKey : e.ctrlKey

      if (e.key === 'b' && prefixKey && e.shiftKey) {
        setShowRightPanel((showRightideBar) => !showRightideBar)
        return
      }

      if (e.key === 'Backspace' && prefixKey && e.shiftKey) {
        if (!activeThread || mainViewState !== MainViewState.Thread) return
        setModalActionThread({
          showModal: ThreadModalAction.Delete,
          thread: activeThread,
        })
        return
      }

      if (e.key === 'c' && prefixKey && e.shiftKey) {
        if (!activeThread || mainViewState !== MainViewState.Thread) return
        setModalActionThread({
          showModal: ThreadModalAction.Clean,
          thread: activeThread,
        })
        return
      }

      if (e.key === 'n' && prefixKey) {
        if (mainViewState !== MainViewState.Thread) return
        requestCreateNewThread(assistants[0])
        setMainViewState(MainViewState.Thread)
        return
      }

      if (e.key === 'b' && prefixKey) {
        setShowLeftPanel((showLeftSideBar) => !showLeftSideBar)
        return
      }

      if (e.key === ',' && prefixKey) {
        setMainViewState(MainViewState.Settings)
        return
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [
    activeThread,
    assistants,
    mainViewState,
    requestCreateNewThread,
    setMainViewState,
    setModalActionThread,
    setShowLeftPanel,
    setShowRightPanel,
  ])

  return <Fragment>{children}</Fragment>
}
