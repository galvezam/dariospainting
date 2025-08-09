import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root
export const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={cn('inline-flex h-10 items-center justify-center rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-1', className)} {...props} />
  )
)
TabsList.displayName = TabsPrimitive.List.displayName

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm dark:ring-offset-slate-900', className)}
      {...props}
    />
  )
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content ref={ref} className={cn('mt-2 text-sm', className)} {...props} />
  )
)
TabsContent.displayName = TabsPrimitive.Content.displayName
