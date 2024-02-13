import React from 'react'

import { Button } from '@janhq/joi'
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@janhq/uikit'

const availableShortcuts = [
  {
    combination: 'E',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Show list your models',
  },
  {
    combination: 'K',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Show list navigation pages',
  },
  {
    combination: 'B',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Toggle collapsible left panel',
  },
  {
    combination: ',',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Navigate to setting page',
  },
  {
    combination: 'Enter',
    description: 'Send a message',
  },
  {
    combination: 'Shift + Enter',
    description: 'Insert new line in input box',
  },
  {
    combination: 'Arrow Up',
    description: 'Navigate to previous option (within search dialog)',
  },
  {
    combination: 'Arrow Down',
    description: 'Navigate to next option (within search dialog)',
  },
]

const ShortcutModal: React.FC = () => (
  <Modal>
    <ModalTrigger>
      <div>
        <Button size="small" theme="primary" variant="soft">
          Show
        </Button>
      </div>
    </ModalTrigger>
    <ModalContent className="max-w-2xl">
      <ModalHeader>
        <ModalTitle>Keyboard Shortcuts</ModalTitle>
      </ModalHeader>
      <div className="my-2 flex flex-col items-center justify-center gap-2">
        <div className="border-border flex w-full gap-4 border-b pb-2">
          <div className="w-1/2 py-2">
            <h6>Combination</h6>
          </div>
          <div className="w-full py-2">
            <h6>Description</h6>
          </div>
        </div>
        {availableShortcuts.map((shortcut, index) => {
          return (
            <div
              key={shortcut.combination}
              className={
                index === availableShortcuts.length - 1
                  ? 'flex w-full gap-4 pb-2'
                  : 'border-border flex w-full gap-4 border-b pb-2'
              }
            >
              <div className="w-1/2 py-2">
                <div className="bg-secondary text-muted-foreground inline-flex items-center justify-center rounded-full px-1 py-0.5 text-xs font-bold">
                  <p>{`${shortcut.modifierKeys?.[0] ?? ''} ${
                    shortcut.combination
                  }`}</p>
                </div>
              </div>
              <div className="w-full py-2">
                <p>{shortcut.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </ModalContent>
  </Modal>
)

export default ShortcutModal
