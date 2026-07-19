import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps<T extends ElementType = 'a'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & ComponentPropsWithoutRef<T>

export function Button<T extends ElementType = 'a'>({
  as,
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps<T>) {
  const Component = as || 'a'

  return (
    <Component
      className={clsx(
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'ghost' && 'btn-ghost',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
