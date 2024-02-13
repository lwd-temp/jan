import { useCallback } from 'react'

import { Thread } from '@janhq/core/'

import { motion as m } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { GalleryHorizontalEndIcon, MoreVerticalIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import useSetActiveThread from '@/hooks/useSetActiveThread'

import { displayDate } from '@/utils/datetime'

import CleanThreadModal from '../CleanThreadModal'

import DeleteThreadModal from '../DeleteThreadModal'

import {
  getActiveThreadIdAtom,
  threadStatesAtom,
  threadsAtom,
} from '@/helpers/atoms/Thread.atom'

export default function ThreadList() {
  const threadStates = useAtomValue(threadStatesAtom)
  const threads = useAtomValue(threadsAtom)
  const activeThreadId = useAtomValue(getActiveThreadIdAtom)
  const { setActiveThread } = useSetActiveThread()

  const onThreadClick = useCallback(
    (thread: Thread) => {
      setActiveThread(thread)
    },
    [setActiveThread]
  )

  return (
    <div className="px-3 py-4">
      {threads.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <GalleryHorizontalEndIcon
            size={26}
            className="text-muted-foreground mx-auto mb-3"
          />
          <h2 className="font-semibold">No Thread History</h2>
        </div>
      ) : (
        threads.map((thread) => (
          <div
            key={thread.id}
            className={twMerge(
              `group/message hover:dark:bg-secondary/50 relative mb-1 flex cursor-pointer flex-col transition-all hover:rounded-lg hover:bg-gray-100`
            )}
            onClick={() => {
              onThreadClick(thread)
            }}
          >
            <div className="relative z-10 p-4 py-4">
              <p className="text-muted-foreground line-clamp-1 text-xs leading-5">
                {thread.updated && displayDate(thread.updated)}
              </p>
              <h2 className="line-clamp-1 font-bold">{thread.title}</h2>
              <p className="mt-1 line-clamp-1 text-xs text-gray-700 group-hover/message:max-w-[160px] dark:text-gray-300">
                {threadStates[thread.id]?.lastMessage
                  ? threadStates[thread.id]?.lastMessage
                  : 'No new message'}
              </p>
            </div>
            <div
              className={twMerge(
                `group/icon text-muted-foreground hover:dark:bg-secondary invisible absolute bottom-2 right-2 z-20 rounded-lg p-1 hover:bg-gray-200 group-hover/message:visible`
              )}
            >
              <MoreVerticalIcon />
              <div className="border-border bg-background invisible absolute right-0 z-20 w-40 overflow-hidden rounded-lg border shadow-lg group-hover/icon:visible">
                <CleanThreadModal threadId={thread.id} />
                <DeleteThreadModal threadId={thread.id} />
              </div>
            </div>
            {activeThreadId === thread.id && (
              <m.div
                className="dark:bg-secondary/50 absolute inset-0 left-0 h-full w-full rounded-lg bg-gray-100 p-4"
                layoutId="active-thread"
              />
            )}
          </div>
        ))
      )}
    </div>
  )
}
