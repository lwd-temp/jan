import React from 'react'

import { Tooltip } from '@janhq/joi'
import { Badge } from '@janhq/uikit'
import { InfoIcon } from 'lucide-react'

const SlowOnYourDeviceLabel: React.FC = () => (
  <Badge className="space-x-1 rounded-md" themes="warning">
    <span>Slow on your device</span>
    <Tooltip
      side="right"
      trigger={<InfoIcon size={16} />}
      content={
        <span>
          This tag indicates that your current RAM performance may affect model
          speed. It can change based on other active apps. To improve, consider
          closing unnecessary applications to free up RAM.
        </span>
      }
    />
  </Badge>
)

export default React.memo(SlowOnYourDeviceLabel)
