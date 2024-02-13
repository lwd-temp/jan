import React from 'react'

import { Tooltip } from '@janhq/joi'
import { Badge } from '@janhq/uikit'
import { InfoIcon } from 'lucide-react'

const NotEnoughRamLabel: React.FC = () => (
  <Badge className="space-x-1 rounded-md" themes="danger">
    <span>Not enough RAM</span>
    <Tooltip
      side="right"
      trigger={<InfoIcon size={16} />}
      content={
        <span>
          {`This tag signals insufficient RAM for optimal model
              performance. It's dynamic and may change with your system's
              RAM availability.`}
        </span>
      }
    />
  </Badge>
)

export default React.memo(NotEnoughRamLabel)
