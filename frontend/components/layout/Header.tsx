export default function Header({
    title,
    subtitle,
    className = '',
    button,
  }: HeaderProps) {
    return (
      <header>
        <div className={`flex flex-row justify-between w-full${className}`}>
          <div className='flex flex-col space-y-3'>
            <p className='text-3xl font-bold text-main-1'>{title}</p>
            {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
          </div>
          {button && <div>{button}</div>}
        </div>
      </header>
    )
  }
  
  interface HeaderProps {
    title: string
    subtitle?: string
    className?: string
    button?: React.ReactNode
  }