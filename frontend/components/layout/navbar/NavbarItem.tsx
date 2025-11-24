import DropdownMenu from '@/components/common/DropdownMenu'
import clsx from 'clsx'
import Link from 'next/link'

export default function NavbarItem({
  href,
  children,
  icon,
  subItems,
}: NavbarItemProps) {
  const hasSubItem = subItems && subItems?.length != 0 ? true : false
  const subItemOptions = subItems?.map((item) => {
    return {
      label: item.name,
      href: item.path,
    }
  })

  if (!hasSubItem) {
    return (
      <Link
        href={href}
        className={clsx(
          'flex w-fit flex-row items-center justify-start gap-x-2',
          'font-medium hover:font-semibold',
          'text-gray-600 hover:text-gray-900',
          'transition-all duration-200 ease-in-out'
        )}>
        {icon}
        <span>{children}</span>
      </Link>
    )
  } else if (hasSubItem && subItemOptions) {
    return (
      <DropdownMenu
        options={subItemOptions}
        className={clsx(
          'flex w-fit flex-row items-center justify-start gap-x-2',
          'font-medium hover:font-semibold',
          'text-gray-600 hover:text-gray-900',
          'transition-all duration-200 ease-in-out',
          'outline-none'
        )}>
        {icon}
        {children}
      </DropdownMenu>
    )
  }
}

interface NavbarItemProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  subItems?: SubItem[] | undefined
}

interface SubItem {
  name: string
  path: string
}