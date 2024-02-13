import { Tooltip, Badge } from '@janhq/joi'
import { Button } from '@janhq/uikit'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { FaGithub, FaDiscord } from 'react-icons/fa'

import DownloadingState from '@/containers/DownloadingState'
import ProgressBar from '@/containers/ProgressBar'

import { appDownloadProgress } from '@/containers/Providers/Jotai'

import { showSelectModelModalAtom } from '@/containers/Providers/KeyListener'
import ShortCut from '@/containers/Shortcut'
import SystemItem from '@/containers/SystemItem'

import { MainViewState } from '@/constants/screens'

import { useActiveModel } from '@/hooks/useActiveModel'

import { modelDownloadStateAtom } from '@/hooks/useDownloadState'
import useGetSystemResources from '@/hooks/useGetSystemResources'
import { useMainViewState } from '@/hooks/useMainViewState'

import styles from './bottomBar.module.scss'

import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'
import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'

const menuLinks = [
  {
    name: 'Discord',
    icon: <FaDiscord size={16} className="flex-shrink-0" />,
    link: 'https://discord.gg/FTk2MvZwJH',
  },
  {
    name: 'Github',
    icon: <FaGithub size={15} className="flex-shrink-0" />,
    link: 'https://github.com/janhq/jan',
  },
]

const BottomBar = () => {
  const { activeModel, stateModel } = useActiveModel()
  const { ram, cpu, gpus } = useGetSystemResources()
  const progress = useAtomValue(appDownloadProgress)
  const downloadedModels = useAtomValue(downloadedModelsAtom)

  const { setMainViewState } = useMainViewState()
  const downloadStates = useAtomValue(modelDownloadStateAtom)
  const setShowSelectModelModal = useSetAtom(showSelectModelModalAtom)
  const [serverEnabled] = useAtom(serverEnabledAtom)

  const calculateGpuMemoryUsage = (gpu: Record<string, never>) => {
    const total = parseInt(gpu.memoryTotal)
    const free = parseInt(gpu.memoryFree)
    if (!total || !free) return 0
    return Math.round(((total - free) / total) * 100)
  }

  const calculateUtilization = () => {
    let sum = 0
    const util = gpus.map((x) => {
      return Number(x['utilization'])
    })
    util.forEach((num) => {
      sum += num
    })
    return sum
  }

  return (
    <div className={styles.bottomBar}>
      <div className="flex flex-shrink-0 items-center justify-end gap-x-2">
        <div className="flex items-center space-x-2">
          {progress && progress > 0 ? (
            <ProgressBar total={100} used={progress} />
          ) : null}
        </div>

        {!serverEnabled && (
          <Badge
            theme="secondary"
            className="cursor-pointer"
            onClick={() => setShowSelectModelModal((show) => !show)}
          >
            My Models
            <ShortCut menu="E" />
          </Badge>
        )}

        {stateModel.state === 'start' && stateModel.loading && (
          <SystemItem
            titleBold
            name="Starting"
            value={stateModel.model || '-'}
          />
        )}
        {stateModel.state === 'stop' && stateModel.loading && (
          <SystemItem
            titleBold
            name="Stopping"
            value={stateModel.model || '-'}
          />
        )}
        {!stateModel.loading &&
          downloadedModels.length !== 0 &&
          activeModel?.id && (
            <SystemItem
              titleBold
              name={'Active model'}
              value={activeModel?.id}
            />
          )}

        {downloadedModels.length === 0 &&
          !stateModel.loading &&
          Object.values(downloadStates).length === 0 && (
            <Button
              size="sm"
              themes="outline"
              onClick={() => setMainViewState(MainViewState.Hub)}
            >
              Download your first model
            </Button>
          )}
        <DownloadingState />
      </div>

      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <SystemItem name="CPU:" value={`${cpu}%`} />
          <SystemItem name="Mem:" value={`${ram}%`} />
        </div>
        {gpus.length > 0 && (
          <Tooltip
            trigger={
              <div className="flex cursor-pointer items-center">
                <SystemItem
                  name={`${gpus.length} GPU `}
                  value={`${calculateUtilization()}% `}
                />
              </div>
            }
            content={
              gpus.length > 1 && (
                <span>
                  {gpus.map((gpu, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span>{gpu.name}</span>
                        <span>{gpu.vram}MB VRAM</span>
                      </div>
                      <span>{gpu.utilization}%</span>
                    </div>
                  ))}
                </span>
              )
            }
          />
        )}
        <span className="text-xs">Jan v{VERSION ?? ''}</span>
        <div className="mt-1 flex items-center gap-x-3">
          {menuLinks.map((link, i) => (
            <div className="relative" key={i}>
              <Tooltip
                sideOffset={8}
                trigger={
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex w-full flex-shrink-0 cursor-pointer items-center justify-center"
                  >
                    {link.icon}
                  </a>
                }
                content={link.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BottomBar
