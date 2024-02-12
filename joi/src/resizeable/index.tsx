import React, { ComponentProps } from "react";

import * as ResizablePrimitive from "react-resizable-panels";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

import { twMerge } from "tailwind-merge";

const ResizablePanelGroup = ({
  className,
  ...props
}: ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={twMerge("", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={twMerge("", className)}
      {...props}
    ></ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
