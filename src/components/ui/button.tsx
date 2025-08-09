import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-5 py-2.5 text-base rounded-2xl'
}

const variantClasses = {
  solid: 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
  outline: 'border border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-800',
  ghost: 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-800'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', size='md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300',
        sizeClasses[size], variantClasses[variant], className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
