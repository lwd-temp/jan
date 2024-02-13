import {
  MessageStatus,
  ExtensionTypeEnum,
  ThreadMessage,
  ChatCompletionRole,
  ConversationalExtension,
  ContentType,
} from '@janhq/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  RefreshCcw,
  CopyIcon,
  Trash2Icon,
  CheckIcon,
  PencilIcon,
} from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { useClipboard } from '@/hooks/useClipboard'
import useSendChatMessage from '@/hooks/useSendChatMessage'

import { extensionManager } from '@/extension'
import {
  deleteMessageAtom,
  editMessageAtom,
  getCurrentChatMessagesAtom,
} from '@/helpers/atoms/ChatMessage.atom'
import { activeThreadAtom } from '@/helpers/atoms/Thread.atom'

const MessageToolbar = ({ message }: { message: ThreadMessage }) => {
  const deleteMessage = useSetAtom(deleteMessageAtom)
  const [editMessage, setEditMessage] = useAtom(editMessageAtom)
  const thread = useAtomValue(activeThreadAtom)
  const messages = useAtomValue(getCurrentChatMessagesAtom)
  const { resendChatMessage } = useSendChatMessage()
  const clipboard = useClipboard({ timeout: 1000 })

  const onDeleteClick = async () => {
    deleteMessage(message.id ?? '')
    if (thread) {
      await extensionManager
        .get<ConversationalExtension>(ExtensionTypeEnum.Conversational)
        ?.writeMessages(
          thread.id,
          messages.filter((msg) => msg.id !== message.id)
        )
    }
  }

  const onEditClick = async () => {
    if (!editMessage.length) {
      setEditMessage(message.id ?? '')
    } else {
      setEditMessage('')
    }
  }

  const onRegenerateClick = async () => {
    resendChatMessage(message)
  }

  if (message.status === MessageStatus.Pending) return null

  return (
    <div className={twMerge('flex flex-row items-center')}>
      <div className="border-border bg-background/20 flex overflow-hidden rounded-md border">
        {message.role === ChatCompletionRole.User &&
          message.content[0]?.type === ContentType.Text && (
            <div
              className="border-border hover:bg-background/80 cursor-pointer border-r px-2 py-2"
              onClick={onEditClick}
            >
              <PencilIcon size={14} />
            </div>
          )}

        {message.id === messages[messages.length - 1]?.id &&
          messages[messages.length - 1].status !== MessageStatus.Error &&
          messages[messages.length - 1].content[0]?.type !==
            ContentType.Pdf && (
            <div
              className="border-border hover:bg-background/80 cursor-pointer border-r px-2 py-2"
              onClick={onRegenerateClick}
            >
              <RefreshCcw size={14} />
            </div>
          )}
        <div
          className="border-border hover:bg-background/80 cursor-pointer border-r px-2 py-2"
          onClick={() => {
            clipboard.copy(message.content[0]?.text?.value ?? '')
          }}
        >
          {clipboard.copied ? (
            <CheckIcon size={14} className="text-green-600" />
          ) : (
            <CopyIcon size={14} />
          )}
        </div>
        <div
          className="hover:bg-background/80 cursor-pointer px-2 py-2"
          onClick={onDeleteClick}
        >
          <Trash2Icon size={14} />
        </div>
      </div>
    </div>
  )
}

export default MessageToolbar
