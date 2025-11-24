import clsx from 'clsx'

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        'h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600',
        className
      )}></div>
  )
}

interface LoadingSpinnerProps {
  className?: string
}