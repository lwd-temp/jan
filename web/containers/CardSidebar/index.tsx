import { ReactNode, useState } from 'react'

import { useAtomValue } from 'jotai'
import {
  ChevronDownIcon,
  MoreVerticalIcon,
  FolderOpenIcon,
  PencilIcon,
} from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useClickOutside } from '@/hooks/useClickOutside'

import { usePath } from '@/hooks/usePath'

import { openFileTitle } from '@/utils/titleUtils'

import { activeThreadAtom } from '@/helpers/atoms/Thread.atom'

interface Props {
  children: ReactNode
  rightAction?: ReactNode
  title: string
  asChild?: boolean
  hideMoreVerticalAction?: boolean
}
export default function CardSidebar({
  children,
  title,
  asChild,
  rightAction,
  hideMoreVerticalAction,
}: Props) {
  const [show, setShow] = useState(true)
  const [more, setMore] = useState(false)
  const [menu, setMenu] = useState<HTMLDivElement | null>(null)
  const [toggle, setToggle] = useState<HTMLDivElement | null>(null)
  const activeThread = useAtomValue(activeThreadAtom)
  const { onReviewInFinder, onViewJson } = usePath()

  useClickOutside(() => setMore(false), null, [menu, toggle])

  return (
    <div
      className={twMerge(
        'border-border flex w-full flex-col border-t bg-zinc-100 dark:bg-zinc-900',
        asChild ? 'rounded-lg border' : 'border-t'
      )}
    >
      <div
        className={twMerge(
          'relative flex items-center justify-between pl-4',
          show && children && 'border-border border-b'
        )}
      >
        <div className="flex items-center ">
          <button
            onClick={() => {
              if (!children) return
              setShow(!show)
            }}
            className="flex w-full flex-1 items-center space-x-2 rounded-lg bg-zinc-100 py-2 pr-2 dark:bg-zinc-900"
          >
            <ChevronDownIcon
              className={twMerge(
                'h-5 w-5 flex-none text-gray-400',
                show && 'rotate-180'
              )}
            />
          </button>
          <span className="font-bold">{title}</span>
        </div>
        <div className="flex">
          {rightAction && rightAction}
          {!asChild && (
            <>
              {!hideMoreVerticalAction && (
                <div
                  ref={setToggle}
                  className="cursor-pointer rounded-lg bg-zinc-100 p-2 px-3 dark:bg-zinc-900"
                  onClick={() => setMore(!more)}
                >
                  <MoreVerticalIcon className="h-5 w-5" />
                </div>
              )}
            </>
          )}
        </div>

        {more && (
          <div
            className="border-border bg-background absolute right-4 top-8 z-50 w-72 rounded-lg border shadow-lg"
            ref={setMenu}
          >
            <div
              className={twMerge(
                'hover:bg-secondary flex cursor-pointer space-x-2 px-4 py-2',
                title === 'Model' ? 'items-start' : 'items-center'
              )}
              onClick={() => {
                onReviewInFinder && onReviewInFinder(title)
                setMore(false)
              }}
            >
              <FolderOpenIcon
                size={16}
                className={twMerge(
                  'text-muted-foreground flex-shrink-0',
                  title === 'Model' && 'mt-1'
                )}
              />
              <>
                {title === 'Model' ? (
                  <div className="flex flex-col">
                    <span className="dark:text-muted-foreground font-medium text-black">
                      {openFileTitle()}
                    </span>
                    <span className="text-muted-foreground mt-1">
                      Opens thread.json. Changes affect this thread only.
                    </span>
                  </div>
                ) : (
                  <span className="text-bold dark:text-muted-foreground text-black">
                    {openFileTitle()}
                  </span>
                )}
              </>
            </div>
            <div
              className="hover:bg-secondary flex cursor-pointer items-start space-x-2 px-4 py-2"
              onClick={() => {
                onViewJson && onViewJson(title)
                setMore(false)
              }}
            >
              <PencilIcon
                size={16}
                className="text-muted-foreground mt-0.5 flex-shrink-0"
              />
              <>
                <div className="flex flex-col">
                  <span className="dark:text-muted-foreground line-clamp-1 font-medium text-black">
                    Edit Global Defaults for{' '}
                    <span
                      className="font-bold"
                      title={activeThread?.assistants[0].model.id}
                    >
                      {activeThread?.assistants[0].model.id}
                    </span>
                  </span>
                  <span className="text-muted-foreground mt-1">
                    {title === 'Model' ? (
                      <>
                        Opens <span className="lowercase">{title}.json.</span>
                        &nbsp;Changes affect all new assistants and threads.
                      </>
                    ) : (
                      <>
                        Opens{' '}
                        <span className="lowercase">
                          {title === 'Tools' ? 'assistant' : title}.json.
                        </span>
                        &nbsp;Changes affect all new threads.
                      </>
                    )}
                  </span>
                </div>
              </>
            </div>
          </div>
        )}
      </div>
      {show && (
        <div
          className={twMerge(
            'dark:bg-background flex flex-col gap-2 bg-white px-2',
            asChild && 'rounded-b-lg'
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
