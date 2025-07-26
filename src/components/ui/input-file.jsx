import * as React from 'react'
import { cn } from '../../../lib/utils'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import UploadFile from '@/assets/icons/button-upload-file.svg'

const inputVariants = cva(
  'cursor-pointer caret-blue flex h-10 w-full border-b-2 bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all',
  {
    variants: {
      variant: {
        light: '',
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

const InputFile = React.forwardRef(
  (
    {
      wrapperClassName,
      className,
      variant,
      error,
      errorMessage,
      placeHolder,
      file,
      setFile,
      ...props
    },
    ref
  ) => {
    const handleEventChange = (event) => {
      setFile(event.target.files[0])
    }

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        <input
          onChange={handleEventChange}
          type="file"
          id="file"
          className="hidden"
          ref={ref}
          {...props}
        />
        <label
          htmlFor="file"
          className={cn(inputVariants({ variant, error }), className)}
        >
          <div className="flex w-full justify-between">
            <span className="opacity-35">{file ? file.name : placeHolder}</span>
            <Image src={UploadFile} width={40} height={40} alt="Upload file" />
          </div>
        </label>
        <div className="px-3 py-2 text-sm font-medium text-black-950">
          PDF (Max 10 Mb).
        </div>
        {error && <p className="pt-1 text-sm text-orange">{errorMessage}</p>}
      </div>
    )
  }
)

InputFile.displayName = 'Input'

export { InputFile, inputVariants }
