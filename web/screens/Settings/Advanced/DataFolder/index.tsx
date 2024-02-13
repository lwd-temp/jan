import { Fragment, useCallback, useEffect, useState } from 'react'

import { fs, AppConfiguration, isSubdirectory } from '@janhq/core'
import { Button, Input } from '@janhq/joi'
import { useSetAtom } from 'jotai'
import { PencilIcon, FolderOpenIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import Loader from '@/containers/Loader'

export const SUCCESS_SET_NEW_DESTINATION = 'successSetNewDestination'

import styles from '../../settings.module.scss'

import ModalChangeDirectory, {
  showDirectoryConfirmModalAtom,
} from './ModalChangeDirectory'
import ModalChangeDestNotEmpty, {
  showDestNotEmptyConfirmAtom,
} from './ModalConfirmDestNotEmpty'
import ModalErrorSetDestGlobal, {
  showChangeFolderErrorAtom,
} from './ModalErrorSetDestGlobal'

import ModalSameDirectory, { showSamePathModalAtom } from './ModalSameDirectory'

const DataFolder = () => {
  const [janDataFolderPath, setJanDataFolderPath] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const setShowDirectoryConfirm = useSetAtom(showDirectoryConfirmModalAtom)
  const setShowSameDirectory = useSetAtom(showSamePathModalAtom)
  const setShowChangeFolderError = useSetAtom(showChangeFolderErrorAtom)
  const showDestNotEmptyConfirm = useSetAtom(showDestNotEmptyConfirmAtom)
  const [destinationPath, setDestinationPath] = useState(undefined)

  useEffect(() => {
    window.core?.api
      ?.getAppConfigurations()
      ?.then((appConfig: AppConfiguration) => {
        setJanDataFolderPath(appConfig.data_folder)
      })
  }, [])

  const onChangeFolderClick = useCallback(async () => {
    const destFolder = await window.core?.api?.selectDirectory()
    if (!destFolder) return

    if (destFolder === janDataFolderPath) {
      setShowSameDirectory(true)
      return
    }

    const appConfiguration: AppConfiguration =
      await window.core?.api?.getAppConfigurations()
    const currentJanDataFolder = appConfiguration.data_folder

    if (await isSubdirectory(currentJanDataFolder, destFolder)) {
      setShowSameDirectory(true)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newDestChildren: any[] = await fs.readdirSync(destFolder)
    const isNotEmpty =
      newDestChildren.filter((x) => x !== '.DS_Store').length > 0

    if (isNotEmpty) {
      showDestNotEmptyConfirm(true)
      return
    }

    setDestinationPath(destFolder)
    setShowDirectoryConfirm(true)
  }, [
    janDataFolderPath,
    setShowDirectoryConfirm,
    setShowSameDirectory,
    showDestNotEmptyConfirm,
  ])

  const onUserConfirmed = useCallback(async () => {
    if (!destinationPath) return
    try {
      setShowLoader(true)
      const appConfiguration: AppConfiguration =
        await window.core?.api?.getAppConfigurations()
      const currentJanDataFolder = appConfiguration.data_folder
      appConfiguration.data_folder = destinationPath
      await fs.syncFile(currentJanDataFolder, destinationPath)
      await window.core?.api?.updateAppConfiguration(appConfiguration)
      console.debug(
        `File sync finished from ${currentJanDataFolder} to ${destinationPath}`
      )
      localStorage.setItem(SUCCESS_SET_NEW_DESTINATION, 'true')
      setTimeout(() => {
        setShowLoader(false)
      }, 1200)
      await window.core?.api?.relaunch()
    } catch (e) {
      console.error(`Error: ${e}`)
      setShowLoader(false)
      setShowChangeFolderError(true)
    }
  }, [destinationPath, setShowChangeFolderError])

  return (
    <Fragment>
      <div
        className={twMerge(
          'first:pt-0 last:border-none',
          styles.listItem,
          '!md:flex-col'
        )}
      >
        <div className={styles.listItemWrapper}>
          <h6 className={styles.listItemTitle}>Jan Data Folder</h6>
          <p className={styles.listItemDescription}>
            Where messages, model configurations, and other user data are
            placed.
          </p>
          <div className="mt-4 flex items-center gap-x-3 lg:w-1/2">
            <div className="relative w-full">
              <Input
                value={janDataFolderPath}
                className="w-full pr-8 "
                disabled
              />
              <FolderOpenIcon
                size={16}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                onClick={() => window.core?.api?.openAppDirectory()}
              />
            </div>
            <Button
              size="small"
              theme="secondary"
              className="h-9 w-9 p-0"
              onClick={onChangeFolderClick}
            >
              <PencilIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <ModalSameDirectory onChangeFolderClick={onChangeFolderClick} />
      <ModalChangeDirectory
        destinationPath={destinationPath ?? ''}
        onUserConfirmed={onUserConfirmed}
      />
      <ModalErrorSetDestGlobal />
      <ModalChangeDestNotEmpty onUserConfirmed={onUserConfirmed} />
      {showLoader && <Loader description="Relocating Jan Data Folder..." />}
    </Fragment>
  )
}

export default DataFolder
