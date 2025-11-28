'use client'

// import react
import { useEffect, useState } from 'react'
import clsx from 'clsx'

// import next
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// import components
import Navbar from './navbar/Navbar'
import NavbarItem from './navbar/NavbarItem'
import DropdownMenu from '../common/DropdownMenu'
import { useModal } from '../../providers/ModalProvider'

// import util
import {
  Disclosure
} from '@headlessui/react'

// import icon
import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'

// import libs
import BasicModal from '../common/BasicModal'

export default function MenuBar() {
  // Get the path accessibility by group
  const router = useRouter()
  const { openModal } = useModal()
  const { data: session, status } = useSession()
  const menus =  [
    {
      name: 'หน้าหลัก',
      icon: <HomeIcon className='size-5' />,
      path: '/',
      subPages: [],
    },
    {
      name: 'หนังสือ',
      icon: <BookOpenIcon className='size-5'/>,
      path: '/books',
      subPages: [],
    },
  ]

  // Secondary variables
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function for redirect to get IDP code
  const handleSignIn = () => {
    if (!session || !session.user) {
      router.push(`/auth/signin`)
    } else {
      openModal(
        <BasicModal
          color='orange'
          title='คุณได้เข้าสู่ระบบแล้ว'
          message='คุณต้องการไปที่หน้าเข้าสู่ระบบใช่หรือไม่?'
          confirmText='ไปที่หน้าเข้าสู่ระบบ'
          cancelText='ยกเลิก'
          onConfirm={() => {
            router.push(`/auth/signin`)
          }}
        />
      )
    }
  }

  // Function for handling sign out
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/',
    })
    router.push('/')
  }

  // handle for sign out modal
  const handleOpenSignOutModal = () => {
    openModal(
      <BasicModal
        color='blue'
        title='ออกจากระบบ'
        message='คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?'
        confirmText='ตกลง'
        cancelText='ยกเลิก'
        onConfirm={() => {
          handleSignOut()
        }}
      />
    )
  }

  // useEffect for opening the menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  // options for dropdown menu
  let options = [
    {
      type: 'custom',
      label: (
        <div className='flex w-56 flex-col gap-x-2 p-2'>
          {status === 'authenticated' && session?.user ? (
            <>
              <h1 className='font-semibold'>{session?.user?.name}</h1>
            </>
          ) : null}
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      label: 'โปรไฟล์',
      icon: <UserCircleIcon className='size-5' />,
      href: `/profile`,
      color: 'gray',
    },
    {
      label: 'ออกจากระบบ',
      icon: <ArrowRightStartOnRectangleIcon className='size-5' />,
      onAction: handleOpenSignOutModal,
      color: 'red',
    },
  ]

  return (
    <div className='fixed top-0 z-[1000] w-screen'>
      <Disclosure as='main' className='flex flex-col' defaultOpen={false}>
        {({ open }) => {
          useEffect(() => {
            setIsMenuOpen(open)
          }, [open])

          return (
            <>
              <Navbar
                className={'container grid grid-cols-2 lg:grid-cols-5'}>

                {/* Navbar Items (Desktop) */}
                <div
                  className={clsx(
                    'w-full flex-row items-center justify-center gap-x-8 lg:col-span-3 flex'
                  )}>
                  {menus &&
                    menus.map((item, index) => (
                      <NavbarItem
                        key={index}
                        href={item.path}
                        subItems={item.subPages}>
                        {item.name}
                      </NavbarItem>
                    ))}
                </div>

                {/* User (Desktop) */}
                <div className={clsx('items-center justify-end space-x-2 flex')}>
                  {session?.user ? (
                    <DropdownMenu options={options}>
                      {session?.user?.name}
                    </DropdownMenu>
                  ) : (
                    <div className='cursor-pointer hover:font-semibold transition-all duration-200 ease-in-out hover:text-gray-900' onClick={handleSignIn}>
                      เข้าสู่ระบบ
                    </div>
                  )}
                </div>
              </Navbar>
            </>
          )
        }}
      </Disclosure>
    </div>
  )
}