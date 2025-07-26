import { forwardRef } from 'react'
import { Button } from './button'
import ArrowIcon from '@/assets/svg-components/ArrowRight'

const iconSizeMap = {
  xs: 'size-3',
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-4',
  xl: 'size-4',
  '2xl': 'size-4'
}

const ButtonCTA = forwardRef(
  ({ isIconOnly = false, size, variant, children, ...props }, ref) => {
    const iconSizeClass = iconSizeMap[size] || iconSizeMap['md']

    return (
      <Button ref={ref} size={size} variant={variant} {...props}>
        {!isIconOnly && children}
        <ArrowIcon
          className={`${iconSizeClass} ${isIconOnly ? 'ml-0' : 'ml-2'}`}
        />
      </Button>
    )
  }
)

ButtonCTA.displayName = 'IconButton'

export { ButtonCTA }
