import { colorMapperMenu, colorMapperText } from '../../utils/color'
import clsx from 'clsx'
import Divider from '../ui/Divider'
import Button from '../ui/Button'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function DropdownMenu({
  id,
  children,
  anchor = 'bottom',
  options,
  className,
}: DropdownMenuProps) {
  return (
    <Menu>
      <MenuButton id={`menuButton-${id}`} className={clsx(className)}>
        {children}
      </MenuButton>

      {/* Pannel */}
      <MenuItems id={`menu-items-${id}`} transition anchor={anchor} className={clsx(
        'flex flex-col gap-y-1',
        'z-[1500] min-w-44 max-w-72 p-2 [--anchor-gap:0.25rem]',
        'bg-white',
        'rounded-xl border border-gray-200',
        'transition-all duration-200 ease-in-out',
        'outline-none',
        'data-[closed]:scale-95 data-[closed]:opacity-0 data-[open]:transition-none'
      )}>
        {options.map((option, index) => {
          if (option.type == 'divider')
            return <Divider key={`${id}-${index}`} />
          else if (option.type == 'custom')
            return (
              <div key={`${id}-${index}`} className={clsx('w-full')}>
                {option.label}
              </div>
            )
          else
            return (
              <MenuItem key={`${id}-${index}`}>
                <Button
                  key={`${id}-${index}`}
                  id={`dropdown-menu-item-${id}-${index}`}
                  variant='custom'
                  className={clsx(
                    '!justify-start p-2',
                    'rounded-md',
                    // --- Color (Custom) ---
                    colorMapperMenu(option.color)
                  )}
                  onClick={option.onAction}
                  href={option.href}
                  target={option.target}
                  disabled={option.disabled}>
                  <span className={clsx(colorMapperText(option.color))}>
                    {option.icon}
                  </span>
                  {option.label}
                </Button>
              </MenuItem>
            )
        })}
      </MenuItems>
    </Menu>
  )
}

interface DropdownMenuProps {
  id?: string
  children: React.ReactNode
  anchor?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top start'
    | 'top end'
    | 'bottom start'
    | 'bottom end'
  options: DropdownMenuItemProps[]
  className?: string
}

interface DropdownMenuItemProps {
  type?: string // "custom" | "divider" | "default"
  label?: React.ReactNode
  onAction?: Function
  href?: string
  target?: string
  icon?: React.ReactNode
  color?: string
  disabled?: boolean
}