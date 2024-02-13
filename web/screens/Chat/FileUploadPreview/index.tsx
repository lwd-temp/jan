import React from 'react'

import { useAtom, useSetAtom } from 'jotai'

import { XIcon } from 'lucide-react'

import { currentPromptAtom, fileUploadAtom } from '@/containers/Providers/Jotai'

import { toGibibytes } from '@/utils/converter'

import Icon from './Icon'

const FileUploadPreview: React.FC = () => {
  const [fileUpload, setFileUpload] = useAtom(fileUploadAtom)
  const setCurrentPrompt = useSetAtom(currentPromptAtom)

  const onDeleteClick = () => {
    setFileUpload([])
    setCurrentPrompt('')
  }

  return (
    <div className="border-border flex flex-col rounded-t-lg border border-b-0 p-4">
      <div className="bg-secondary relative inline-flex w-60 space-x-3 rounded-lg p-4">
        <Icon type={fileUpload[0].type} />

        <div>
          <h6 className="line-clamp-1 font-medium">
            {fileUpload[0].file.name.replaceAll(/[-._]/g, ' ')}
          </h6>
          <p className="text-muted-foreground">
            {toGibibytes(fileUpload[0].file.size)}
          </p>
        </div>

        <div
          className="bg-foreground absolute -right-2 -top-2 cursor-pointer rounded-full p-0.5"
          onClick={onDeleteClick}
        >
          <XIcon size={14} className="text-background" />
        </div>
      </div>
    </div>
  )
}

export default FileUploadPreview
