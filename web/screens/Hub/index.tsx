import { useState } from 'react'

import { Input, Button, useDebouncedState } from '@janhq/joi'

import { useAtomValue } from 'jotai'
import { SearchIcon, Settings2Icon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import styles from './hub.module.scss'

import {
  configuredModelsAtom,
  downloadedModelsAtom,
} from '@/helpers/atoms/Model.atom'

export default function HubScreen() {
  const [searchValue, setsearchValue] = useDebouncedState('', 400)
  const configuredModels = useAtomValue(configuredModelsAtom)
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const [showFilter, setShowFilter] = useState(false)

  // const filteredModels = configuredModels.filter((x) => {
  //   if (sortSelected === 'Downloaded') {
  //     return (
  //       x.name.toLowerCase().includes(searchValue.toLowerCase()) &&
  //       downloadedModels.some((y) => y.id === x.id)
  //     )
  //   } else if (sortSelected === 'Recommended') {
  //     return (
  //       x.name.toLowerCase().includes(searchValue.toLowerCase()) &&
  //       x.metadata.tags.includes('Featured')
  //     )
  //   } else {
  //     return x.name.toLowerCase().includes(searchValue.toLowerCase())
  //   }
  // })

  console.log(searchValue, 'searchValue')
  console.log(configuredModels, 'configuredModels')
  console.log(downloadedModels, 'downloadedModels')

  return (
    <div className={styles.hub}>
      <div className={styles.hubContent}>
        <div className={styles.hubHeader}>
          <div className="mx-auto flex h-full flex-col items-center justify-center px-4 lg:w-1/2">
            <h1 className="mb-4 text-2xl font-bold">Discover models</h1>
            <div className="w-full">
              <div className="flex w-full gap-x-2">
                <Input
                  prefixIcon={<SearchIcon size={16} />}
                  placeholder="Search models"
                  onChange={(e) => {
                    setsearchValue(e.target.value)
                  }}
                />
                <Button
                  theme="secondary"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Settings2Icon size={16} />
                </Button>
              </div>
              <div className="mt-4">
                <Button size="small" variant="soft" asChild>
                  <a
                    href="https://jan.ai/guides/using-models/import-manually/"
                    target="_blank"
                  >
                    How to manually import models
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={twMerge(styles.hubFilter, showFilter && styles.isShow)}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          voluptatem culpa consectetur eos ab, hic eius. Iste corporis libero
          hic similique provident, possimus tempore iure, cumque modi inventore
          ducimus tenetur.
        </p>
      </div>
    </div>
  )
}
