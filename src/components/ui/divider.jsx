import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const dividerVariants = cva('bg-gray-200', {
  variants: {
    variant: {
      horizontal: 'w-full h-[1.5px]',
      vertical: 'w-[1.5px] h-full'
    }
  },
  defaultVariants: {
    variant: 'horizontal'
  }
})

function Divider({ className, variant, ...props }) {
  return (
    <div className={cn(dividerVariants({ variant }), className)} {...props} />
  )
}

export { Divider, dividerVariants }
