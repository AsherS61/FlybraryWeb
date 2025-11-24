import clsx from 'clsx'

export default function Navbar({ children, className }: NavbarProps) {
  return (
    <div
      className={'sticky top-0 z-[100] w-full bg-white shadow-sm transition-all duration-200 ease-in-out'}>
      <div
        className={clsx(
          'h-16 w-full',
          // --- Custom ---
          className
        )}>
        {children}
      </div>
    </div>
  )
}

interface NavbarProps {
  children: React.ReactNode
  className?: string
}