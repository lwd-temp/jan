import React, { ReactNode } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import "./styles.scss";

export interface TooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip = ({
  trigger,
  content,
  side = "top",
  open,
  onOpenChange,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={600}
        open={open}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={4}
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
