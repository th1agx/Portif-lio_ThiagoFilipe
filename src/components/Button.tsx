import type { AnchorHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <a
      className={clsx(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-0',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-candy',
        variant === 'primary' &&
          'bg-studio-royal text-white shadow-glow hover:bg-studio-candy hover:shadow-candy',
        variant === 'secondary' &&
          'border border-white/15 bg-white/[0.06] text-studio-text hover:border-studio-royal/70 hover:bg-white/[0.1]',
        variant === 'ghost' && 'text-studio-muted hover:text-studio-text',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
