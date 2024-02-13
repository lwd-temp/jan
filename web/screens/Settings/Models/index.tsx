import { useState } from 'react'

import { Input } from '@janhq/uikit'

import { useAtomValue } from 'jotai'
import { SearchIcon } from 'lucide-react'

import RowModel from './Row'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'

const Column = ['Name', 'Model ID', 'Size', 'Version', 'Status', '']

export default function Models() {
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const [searchValue, setsearchValue] = useState('')

  const filteredDownloadedModels = downloadedModels.filter((x) => {
    return x.name?.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <div className="relative">
      <SearchIcon
        size={20}
        className="text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2"
      />
      <Input
        placeholder="Search"
        className="pl-8"
        onChange={(e) => {
          setsearchValue(e.target.value)
        }}
      />
    </div>
  )
}

{
  /* <div className="relative">
  <table className="w-full px-8">
    <thead className="border-border bg-secondary w-full border-b">
      <tr>
        {Column.map((col, i) => {
          return (
            <th
              key={i}
              className="px-6 py-2 text-left font-normal last:text-center"
            >
              {col}
            </th>
          )
        })}
      </tr>
    </thead>
    <tbody>
      {filteredDownloadedModels
        ? filteredDownloadedModels.map((x, i) => {
            return <RowModel key={i} data={x} />
          })
        : null}
    </tbody>
  </table>
</div> */
}
