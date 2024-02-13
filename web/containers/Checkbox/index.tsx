import React from 'react'

import { Tooltip, Switch } from '@janhq/joi'

import { InfoIcon } from 'lucide-react'

type Props = {
  name: string
  title: string
  enabled?: boolean
  description: string
  checked: boolean
  onValueChanged?: (e: string | number | boolean) => void
}

const Checkbox: React.FC<Props> = ({
  title,
  checked,
  enabled = true,
  description,
  onValueChanged,
}) => {
  const onCheckedChange = (checked: boolean) => {
    onValueChanged?.(checked)
  }

  return (
    <div className="flex justify-between">
      <div className="mb-1 flex items-center gap-x-2">
        <p className="text-sm font-semibold text-zinc-500 dark:text-gray-300">
          {title}
        </p>
        <Tooltip
          trigger={
            <InfoIcon size={16} className="flex-shrink-0 dark:text-gray-500" />
          }
          content={<span>{description}</span>}
        />
      </div>
      <Switch
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        disabled={!enabled}
      />
    </div>
  )
}

export default Checkbox
