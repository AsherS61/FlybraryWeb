import clsx from 'clsx'

export default function Divider({ id, title, align, className }: DividerProps) {
  return (
    <div
      id={`divider-${id}`}
      className={clsx(
        'my-2 flex w-full flex-row items-center justify-center',
        'text-nowrap font-semibold',
        'text-gray-900',
        className
      )}>
      <hr
        className={clsx(
          'w-full',
          'border-gray-200',
          align == 'left' && 'hidden'
        )}
      />
      {title}
      <hr
        className={clsx(
          'w-full',
          'border-gray-200',
          align == 'right' && 'hidden'
        )}
      />
    </div>
  )
}

interface DividerProps {
  id?: string
  title?: React.ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}