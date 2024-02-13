import React, { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import "./styles.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefixIcon, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {prefixIcon && <div className="input-prefix">{prefixIcon}</div>}
        <input
          type={type}
          className={twMerge("input", prefixIcon && "with-prefix", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export { Input };
