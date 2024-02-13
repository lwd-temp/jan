/* eslint-disable react/display-name */

import { forwardRef, useState } from 'react'

import { Model } from '@janhq/core'
import { Badge } from '@janhq/uikit'

import ExploreModelItemHeader from '@/screens/ExploreModels/ExploreModelItemHeader'

type Props = {
  model: Model
}

const ExploreModelItem = forwardRef<HTMLDivElement, Props>(({ model }, ref) => {
  const [open, setOpen] = useState('')

  const handleToggle = () => {
    if (open === model.id) {
      setOpen('')
    } else {
      setOpen(model.id)
    }
  }

  return (
    <div
      ref={ref}
      className="border-border bg-background/60 mb-6 flex flex-col overflow-hidden rounded-xl border"
    >
      <ExploreModelItemHeader
        model={model}
        onClick={handleToggle}
        open={open}
      />
      {open === model.id && (
        <div className="flex">
          <div className="border-border flex w-full flex-col border-t p-4 ">
            <div className="mb-6 flex flex-col gap-1">
              <span className="font-semibold">About</span>
              <p className="text-muted-foreground">
                {model.description || '-'}
              </p>
            </div>
            <div className="flex space-x-10">
              <div>
                <span className="text-muted-foreground font-semibold">
                  Author
                </span>
                <p className="mt-2 line-clamp-1 font-medium">
                  {model.metadata.author}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground mb-1 font-semibold">
                  Model ID
                </span>
                <p className="mt-2 line-clamp-1 font-medium">{model.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground mb-1 font-semibold">
                  Tags
                </span>
                <div className="mt-2 flex space-x-2">
                  {model.metadata.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      themes="primary"
                      className="line-clamp-1"
                      title={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-border w-48 flex-shrink-0 border-l border-t p-4">
            <div>
              <span className="text-muted-foreground font-semibold">
                Format
              </span>
              <p className="mt-2 font-medium uppercase">{model.format}</p>
            </div>
            {/* <div className="mt-4">
              <span className="font-semibold text-muted-foreground">
                Compatibility
              </span>
              <p className="mt-2 font-medium">-</p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
})

export default ExploreModelItem
