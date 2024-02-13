/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'

import { Model } from '@janhq/core'
import { Tooltip } from '@janhq/joi'
import { Badge, Button } from '@janhq/uikit'

import { atom, useAtomValue } from 'jotai'

import { ChevronDownIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import ModalCancelDownload from '@/containers/ModalCancelDownload'

import { MainViewState } from '@/constants/screens'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'
import useDownloadModel from '@/hooks/useDownloadModel'

import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

import { useMainViewState } from '@/hooks/useMainViewState'

import { toGibibytes } from '@/utils/converter'

import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'
import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'
import {
  nvidiaTotalVramAtom,
  totalRamAtom,
} from '@/helpers/atoms/SystemBar.atom'

type Props = {
  model: Model
  onClick: () => void
  open: string
}

const ExploreModelItemHeader: React.FC<Props> = ({ model, onClick, open }) => {
  const { downloadModel } = useDownloadModel()
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const { requestCreateNewThread } = useCreateNewThread()
  const totalRam = useAtomValue(totalRamAtom)
  const nvidiaTotalVram = useAtomValue(nvidiaTotalVramAtom)
  // Default nvidia returns vram in MB, need to convert to bytes to match the unit of totalRamW
  let ram = nvidiaTotalVram * 1024 * 1024
  if (ram === 0) {
    ram = totalRam
  }
  const serverEnabled = useAtomValue(serverEnabledAtom)
  const assistants = useAtomValue(assistantsAtom)

  const downloadAtom = useMemo(
    () => atom((get) => get(modelDownloadStateAtom)[model.id]),
    [model.id]
  )
  const downloadState = useAtomValue(downloadAtom)
  const { setMainViewState } = useMainViewState()

  const onDownloadClick = useCallback(() => {
    downloadModel(model)
  }, [model])

  const isDownloaded = downloadedModels.find((md) => md.id === model.id) != null

  let downloadButton = (
    <Button
      className="z-50"
      onClick={(e) => {
        e.stopPropagation()
        onDownloadClick()
      }}
    >
      Download
    </Button>
  )

  const onUseModelClick = useCallback(async () => {
    if (assistants.length === 0) {
      alert('No assistant available')
      return
    }
    await requestCreateNewThread(assistants[0], model)
    setMainViewState(MainViewState.Thread)
  }, [])

  if (isDownloaded) {
    downloadButton = (
      <Tooltip
        trigger={
          <Button
            themes="secondaryBlue"
            className="min-w-[98px]"
            onClick={onUseModelClick}
            disabled={serverEnabled}
          >
            Use
          </Button>
        }
        content={
          serverEnabled && (
            <span>Threads are disabled while the server is running</span>
          )
        }
      />
    )
  } else if (downloadState != null) {
    downloadButton = <ModalCancelDownload model={model} />
  }

  const getLabel = (size: number) => {
    if (size * 1.25 >= ram) {
      return (
        <Badge className="rounded-md" themes="danger">
          Not enough RAM
        </Badge>
      )
    } else {
      return (
        <Badge className="rounded-md" themes="success">
          Recommended
        </Badge>
      )
    }
  }

  return (
    <div
      className="bg-background cursor-pointer rounded-t-md"
      onClick={onClick}
    >
      {model.metadata.cover && (
        <div className="relative h-full w-full ">
          <img
            src={model.metadata.cover}
            className="h-[250px] w-full object-cover"
            alt={`Cover - ${model.id}`}
          />
        </div>
      )}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="font-bold">{model.name}</span>
        </div>
        <div className="inline-flex items-center space-x-2">
          <span className="text-muted-foreground mr-4 font-semibold">
            {toGibibytes(model.metadata.size)}
          </span>
          {getLabel(model.metadata.size)}

          {downloadButton}
          <ChevronDownIcon
            className={twMerge(
              'h-5 w-5 flex-none text-gray-400',
              open === model.id && 'rotate-180'
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default ExploreModelItemHeader
