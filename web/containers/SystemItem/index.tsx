import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = {
  name?: string
  value: string | ReactNode
  titleBold?: boolean
}

export default function SystemItem({ name, value, titleBold }: Props) {
  return (
    <div className="flex items-center gap-x-1.5 text-xs">
      <p className={twMerge(titleBold ? 'font-semibold' : 'opacity-70')}>
        {name}
      </p>
      <span className={twMerge(titleBold ? 'opacity-70 ' : 'font-semibold')}>
        {value}
      </span>
    </div>
  )
}
