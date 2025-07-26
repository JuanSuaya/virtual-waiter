import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'font-light uppercase w-fit items-center rounded-full border-[1.5px] px-[16px] py-[8px]  text-xs font-semibold transition-colors hover:cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-black-200 text-gray-200 hover:bg-black-200/80 text-black-400',
        secondary: 'bg-transparent border-black hover:bg-white/20',
        tertiary: 'bg-transparent border-white hover:bg-white/10 text-white'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

function Badge({ className, variant, href = '/', ...props }) {
  return (
    <Link
      href={href}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
