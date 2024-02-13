import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import "./styles.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge("input", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Input };
