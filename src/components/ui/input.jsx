import * as React from 'react'
import { cn } from "../../lib/utils"
import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'caret-blue flex h-10 w-full border-b-2 bg-transparent rounded-none px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white placeholder:opacity-35 outline-none focus-visible:border-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all',
  {
    variants: {
      variant: {
        light: 'placeholder:text-black',
        dark: 'border-white text-white'
      },
      error: {
        true: 'border-orange text-orange focus-visible:border-orange'
      }
    },
    defaultVariants: {
      variant: 'light',
      error: false
    }
  }
)

const Input = React.forwardRef(
  (
    {
      wrapperClassName,
      className,
      type,
      variant,
      error,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        <input
          type={type}
          className={cn(inputVariants({ variant, error }), className)}
          ref={ref}
          {...props}
        />
        {error && <p className="pt-1 text-sm text-orange">{errorMessage}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
