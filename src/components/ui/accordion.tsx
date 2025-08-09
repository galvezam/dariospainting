import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root
export const AccordionItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn('border-b dark:border-slate-800', className)} {...props} />
  )
)
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn('flex flex-1 items-center justify-between py-3 text-left text-sm font-medium transition-all hover:text-blue-700 dark:hover:text-blue-300', className)}
        {...props}
      >
        {children}
        <span className="ml-4">▾</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn('overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up', className)}
      {...props}
    >
      <div className="pb-3 text-slate-600 dark:text-slate-300">{children}</div>
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = 'AccordionContent'
