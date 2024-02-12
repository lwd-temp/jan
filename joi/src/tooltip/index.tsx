import React, { ReactNode } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import "./styles.scss";

export interface TooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  hidden?: boolean;
  sideOffset?: number;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip = ({
  trigger,
  content,
  sideOffset = 4,
  side = "top",
  hidden,
  open,
  onOpenChange,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={400}
        open={open}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={sideOffset}
            hidden={hidden}
            className="tooltip"
            side={side}
          >
            {content}
            <TooltipPrimitive.Arrow className="tooltip--arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export { Tooltip };
