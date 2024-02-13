'use client'

import {
  useContext,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
} from 'react'

import { openExternalUrl } from '@janhq/core'

import { fs } from '@janhq/core'
import { Switch, Button, Input } from '@janhq/joi'

import { twMerge } from 'tailwind-merge'

import ShortcutModal from '@/containers/ShortcutModal'

import { snackbar, toaster } from '@/containers/Toast'

import { FeatureToggleContext } from '@/context/FeatureToggle'

import { useSettings } from '@/hooks/useSettings'

import styles from '../settings.module.scss'

import DataFolder from './DataFolder'
import FactoryReset from './FactoryReset'

const Advanced = () => {
  const {
    experimentalFeature,
    setExperimentalFeature,
    ignoreSSL,
    setIgnoreSSL,
    proxy,
    setProxy,
  } = useContext(FeatureToggleContext)
  const [partialProxy, setPartialProxy] = useState<string>(proxy)
  const [gpuEnabled, setGpuEnabled] = useState<boolean>(false)
  const [gpuList, setGpuList] = useState([
    { id: 'none', vram: null, name: 'none' },
  ])
  const [gpusInUse, setGpusInUse] = useState<string[]>([])
  const { readSettings, saveSettings, validateSettings, setShowNotification } =
    useSettings()

  const selectedGpu = gpuList
    .filter((x) => gpusInUse.includes(x.id))
    .map((y) => {
      return y['name']
    })

  const onProxyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value || ''
      setPartialProxy(value)
      if (value.trim().startsWith('http')) {
        setProxy(value.trim())
      } else {
        setProxy('')
      }
    },
    [setPartialProxy, setProxy]
  )

  useEffect(() => {
    const setUseGpuIfPossible = async () => {
      const settings = await readSettings()
      setGpuEnabled(settings.run_mode === 'gpu')
      setGpusInUse(settings.gpus_in_use || [])
      if (settings.gpus) {
        setGpuList(settings.gpus)
      }
    }
    setUseGpuIfPossible()
  }, [readSettings])

  const clearLogs = async () => {
    if (await fs.existsSync(`file://logs`)) {
      await fs.rmdirSync(`file://logs`, { recursive: true })
    }
    toaster({
      title: 'Logs cleared',
      description: 'All logs have been cleared.',
      type: 'success',
    })
  }

  const handleGPUChange = (gpuId: string) => {
    // TODO detect current use GPU nvidia or AMD
    let updatedGpusInUse = [...gpusInUse]
    if (updatedGpusInUse.includes(gpuId)) {
      updatedGpusInUse = updatedGpusInUse.filter((id) => id !== gpuId)
      if (gpuEnabled && updatedGpusInUse.length === 0) {
        updatedGpusInUse.push(gpuId)
      }
    } else {
      updatedGpusInUse.push(gpuId)
    }
    setGpusInUse(updatedGpusInUse)
    saveSettings({ gpusInUse: updatedGpusInUse })
  }

  return (
    <div className="block w-full">
      {/* Keyboard shortcut  */}
      <div className={twMerge('!pt-0 last:border-none', styles.listItem)}>
        <div className={styles.listItemWrapper}>
          <div className="flex gap-x-2">
            <h6 className={styles.listItemTitle}>Keyboard Shortcuts</h6>
          </div>
          <p className={styles.listItemDescription}>
            Shortcuts that you might find useful in Jan app.
          </p>
        </div>
        {/* fix button */}
        {/* <ShortcutModal /> */}
      </div>

      {/* Experimental */}
      <div className={styles.listItem}>
        <div className={styles.listItemWrapper}>
          <div className="flex gap-x-2">
            <h6 className={styles.listItemTitle}>Experimental Mode</h6>
          </div>
          <p className={styles.listItemDescription}>
            Enable experimental features that may be unstable tested.
          </p>
        </div>
        <Switch
          className="mt-4 flex-shrink-0 md:mt-0"
          checked={experimentalFeature}
          onChange={(e) => setExperimentalFeature(e.target.checked)}
        />
      </div>

      {/* CPU / GPU switching */}
      {!isMac && (
        <div className={styles.listItem}>
          <div className={styles.listItemWrapper}>
            <div className="flex gap-x-2">
              <h6 className={styles.listItemTitle}>Nvidia GPU</h6>
            </div>
            <p className={styles.listItemDescription}>
              Enable GPU acceleration for Nvidia GPUs.
            </p>
          </div>
          <Switch
            className="mt-4 flex-shrink-0 md:mt-0"
            checked={gpuEnabled}
            onChange={(e) => {
              if (e.target.checked === true) {
                saveSettings({ runMode: 'gpu' })
                setGpuEnabled(true)
                setShowNotification(false)
                setTimeout(() => {
                  validateSettings()
                }, 300)
              } else {
                saveSettings({ runMode: 'cpu' })
                setGpuEnabled(false)
              }
            }}
          />
        </div>
      )}

      {/* Warning message */}
      {gpuEnabled && gpusInUse.length > 1 && (
        <p className="mt-2 italic text-red-500">
          If enabling multi-GPU without the same GPU model or without NVLink, it
          may affect token speed.
        </p>
      )}

      <DataFolder />

      {/* Proxy */}
      <div className={styles.listItem}>
        <div className={styles.listItemWrapper}>
          <div className="flex gap-x-2">
            <h6 className={styles.listItemTitle}>HTTPS Proxy</h6>
          </div>
          <p className={styles.listItemDescription}>
            Specify the HTTPS proxy or leave blank (proxy auto-configuration and
            SOCKS not supported).
          </p>
          <Input
            placeholder={'http://<user>:<password>@<domain or IP>:<port>'}
            className="mt-4 w-full md:w-1/2"
            value={partialProxy}
            onChange={onProxyChange}
          />
        </div>
      </div>

      {/* Ignore SSL certificates */}
      <div className={styles.listItem}>
        <div className={styles.listItemWrapper}>
          <div className="flex gap-x-2">
            <h6 className={styles.listItemTitle}>Ignore SSL certificates</h6>
          </div>
          <p className={styles.listItemDescription}>
            Allow self-signed or unverified certificates - may be required for
            certain proxies.
          </p>
        </div>
        <Switch
          className="mt-4 flex-shrink-0 md:mt-0"
          checked={ignoreSSL}
          onChange={(e) => setIgnoreSSL(e.target.checked)}
        />
      </div>

      {/* Clear log */}
      <div className={styles.listItem}>
        <div className={styles.listItemWrapper}>
          <div className="flex gap-x-2">
            <h6 className={styles.listItemTitle}>Clear logs</h6>
          </div>
          <p className={styles.listItemDescription}>
            Clear all logs from Jan app.
          </p>
        </div>
        <Button
          size="small"
          className="mt-4 md:mt-0"
          theme="destructive"
          variant="soft"
          onClick={clearLogs}
        >
          Clear
        </Button>
      </div>

      {/* Factory Reset */}
      <FactoryReset />
    </div>
  )
}

// TODO @faisal fix GPU when on windows
// {gpuEnabled && (
//   <div className="mt-4">
//     <label className="block text-sm font-medium text-gray-700">
//       Select GPU(s)
//     </label>
//     <div className="mt-2 space-y-2">
//     <div>
//       {gpuList.map((gpu) => (
//         <>
//         <div key={gpu.id}>
//           <input
//             type="checkbox"
//             id={`gpu-${gpu.id}`}
//             name="gpu"
//             value={gpu.id}
//             checked={gpusInUse.includes(gpu.id)}
//             onChange={() => handleGPUChange(gpu.id)}
//           />
//           <label htmlFor={`gpu-${gpu.id}`}>
//             {' '}
//             {gpu.name} (VRAM: {gpu.vram} MB)
//           </label>
//         </div>
//         <p className="pr-8 leading-relaxed">
//           Enable to enhance model performance by utilizing your devices
//           GPU for acceleration. Read{' '}
//           <span>
//             {' '}
//             <span
//               className="cursor-pointer text-blue-600"
//               onClick={() =>
//                 openExternalUrl(
//                   'https://jan.ai/guides/troubleshooting/gpu-not-used/'
//                 )
//               }
//             >
//               troubleshooting guide
//             </span>{' '}
//           </span>{' '}
//           for further assistance.
//         </p>

//       {gpuList.length > 0 && !gpuEnabled && (
//         <Tooltip>
//           <TooltipTrigger>
//             <AlertCircleIcon size={20} className="mr-2 text-yellow-600" />
//           </TooltipTrigger>
//           <TooltipContent
//             side="right"
//             sideOffset={10}
//             className="max-w-[240px]"
//           >
//             <span>
//               Disabling GPU Acceleration may result in reduced
//               performance. It is recommended to keep this enabled for
//               optimal user experience.
//             </span>
//             <TooltipArrow />
//           </TooltipContent>
//         </Tooltip>
//       )}

//       <Tooltip>
//         <TooltipTrigger>
//           <Switch
//             checked={gpuEnabled}
//             onCheckedChange={(e) => {
//               if (e === true) {
//                 saveSettings({ runMode: 'gpu' })
//                 setGpuEnabled(true)
//                 setShowNotification(false)
//                 snackbar({
//                   description: 'Successfully turned on GPU Accelertion',
//                   type: 'success',
//                 })
//                 setTimeout(() => {
//                   validateSettings()
//                 }, 300)
//               } else {
//                 saveSettings({ runMode: 'cpu' })
//                 setGpuEnabled(false)
//                 snackbar({
//                   description: 'Successfully turned off GPU Accelertion',
//                   type: 'success',
//                 })
//               }
//             }}
//           />
//         </TooltipTrigger>
//         {gpuList.length === 0 && (
//           <TooltipContent
//             side="right"
//             sideOffset={10}
//             className="max-w-[240px]"
//           >
//             <span>
//               Your current device does not have a compatible GPU for
//               monitoring. To enable GPU monitoring, please ensure your
//               device has a supported Nvidia or AMD GPU with updated
//               drivers.
//             </span>
//             <TooltipArrow />
//           </TooltipContent>
//         )}
//       </Tooltip>
//         </>

//     {gpuEnabled && (
//       <div className="mt-2 w-full rounded-lg bg-secondary p-4">
//         <label className="mb-1 inline-block font-medium">
//           Choose GPU
//         </label>
//         <Select value={selectedGpu.join()}>
//           <SelectTrigger className="w-[340px] bg-white">
//             <SelectValue placeholder="Select GPU">
//               <span className="line-clamp-1 w-full pr-8">
//                 {selectedGpu.join()}
//               </span>
//             </SelectValue>
//           </SelectTrigger>
//           <SelectPortal>
//             <SelectContent className="w-[400px] px-1 pb-2">
//               <SelectGroup>
//                 <SelectLabel>Nvidia</SelectLabel>
//                 <div className="px-4 pb-2">
//                   <div className="rounded-lg bg-secondary p-3">
//                     {gpuList
//                       .filter((gpu) =>
//                         gpu.name.toLowerCase().includes('nvidia')
//                       )
//                       .map((gpu) => (
//                         <div
//                           key={gpu.id}
//                           className="my-1 flex items-center space-x-2"
//                         >
//                           <Checkbox
//                             id={`gpu-${gpu.id}`}
//                             name="gpu-nvidia"
//                             className="bg-white"
//                             value={gpu.id}
//                             checked={gpusInUse.includes(gpu.id)}
//                             onCheckedChange={() =>
//                               handleGPUChange(gpu.id)
//                             }
//                           />
//                           <label
//                             className="flex w-full items-center justify-between"
//                             htmlFor={`gpu-${gpu.id}`}
//                           >
//                             <span>{gpu.name}</span>
//                             <span>{gpu.vram}MB VRAM</span>
//                           </label>
//                         </div>
//                       ))}
//                   </div>
//                   {/* Warning message */}
//                   {gpuEnabled && gpusInUse.length > 1 && (
//                     <div className="mt-2 flex items-start space-x-2 text-yellow-500">
//                       <AlertTriangleIcon
//                         size={16}
//                         className="flex-shrink-0"
//                       />
//                       <p className="text-xs leading-relaxed">
//                         If multi-GPU is enabled with different GPU models
//                         or without NVLink, it could impact token speed.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </SelectGroup>

//               {/* TODO enable this when we support AMD */}
//             </SelectContent>
//           </SelectPortal>
//         </Select>
//       </div>
//     )}
//   </div>
//   </div>
// )}

export default Advanced
