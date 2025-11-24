'use client'

// import react
import { useEffect, useState } from 'react'
import clsx from 'clsx'

// import next
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// import components
import Navbar from './navbar/Navbar'
import NavbarItem from './navbar/NavbarItem'
import DropdownMenu from '../common/DropdownMenu'
import { useModal } from '@/providers/ModalProvider'

// import util
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// import icon
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'

// import libs
import Divider from '../ui/Divider'
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
        imageURL={'/image/Banner.png'}
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
              <p className='text-sm text-gray-600'>
                {session?.user?.studentId || session?.user?.email}
              </p>
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
      href: `/profile/${session?.user?.id}`,
      color: 'gray',
    },
    {
      label: 'คู่มือการใช้งาน',
      icon: <QuestionMarkCircleIcon className='size-5' />,
      href: `/document`,
      color: 'gray',
    },
    {
      label: 'ออกจากระบบ',
      icon: <ArrowRightStartOnRectangleIcon className='size-5' />,
      onAction: handleOpenSignOutModal,
      color: 'red',
    },
  ]

  if (session?.user.role && session?.user.role !== 'student') {
    options.push({
      type: 'divider',
    })
    options.push({
      label: 'จัดการระบบ',
      icon: <WrenchScrewdriverIcon className='size-5' />,
      href: '/console',
      color: 'gray',
    })
  }

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
                className={clsx('container grid grid-cols-2 lg:grid-cols-5')}>
                {/* Logo */}
                <div className='flex w-full flex-row items-center justify-start'>
                  <Image
                    src='/logo/small.png'
                    alt='Logo'
                    width={0}
                    height={0}
                    loading='eager'
                    sizes='100vw'
                    className='h-8 w-auto'
                  />
                </div>

                {/* Navbar Items (Desktop) */}
                <div
                  className={clsx(
                    'hidden w-full flex-row items-center justify-center gap-x-8 lg:col-span-3 lg:flex'
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
                <div className={clsx('items-center justify-end space-x-2 lg:flex')}>
                  {session?.user ? (
                    <DropdownMenu options={options}>
                      {session?.user?.name}
                    </DropdownMenu>
                  ) : (
                    <div className='cursor-pointer' onClick={handleSignIn}>
                      เข้าสู่ระบบ
                    </div>
                  )}
                </div>

                {/* Mobile Navbar Toggle Button */}
                <div
                  className={clsx(
                    'flex w-full flex-row items-center justify-end lg:hidden'
                  )}>
                  <DisclosureButton className='inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block size-5' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block size-5' aria-hidden='true' />
                    )}
                  </DisclosureButton>
                </div>
              </Navbar>

              {/* Mobile Dropdown Menu */}
              <DisclosurePanel
                className={clsx(
                  'fixed inset-0 top-16 h-screen w-full space-y-2 overflow-y-auto bg-white/80 py-6 backdrop-blur-md lg:hidden'
                )}>
                <div
                  className={clsx('container w-full space-y-2 px-0 lg:hidden')}>
                  {menus &&
                    menus.map((item, index) => (
                      <DisclosureButton
                        key={index}
                        as='a'
                        href={item.path}
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        {item.name}
                      </DisclosureButton>
                    ))}

                  {/* line */}
                  <div className='border-b border-gray-200' />

                  {/* User (Mobile) */}
                  {session?.user && status === 'authenticated' ? (
                    <div className={clsx('flex flex-col space-y-2')}>
                      <DisclosureButton
                        as='a'
                        href={`/profile/${session?.user?.id}`}
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        โปรไฟล์
                      </DisclosureButton>
                      <DisclosureButton
                        as='a'
                        href='/document'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        คู่มือการใช้งาน
                      </DisclosureButton>
                      <DisclosureButton
                        as='a'
                        onClick={handleOpenSignOutModal}
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        ออกจากระบบ
                      </DisclosureButton>
                      {session?.user.role !== 'student' && (
                        <>
                          <Divider />
                          <DisclosureButton
                            as='a'
                            href='/console'
                            className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                            จัดการระบบ
                          </DisclosureButton>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className={clsx('flex flex-col space-y-2')}>
                      <DisclosureButton
                        as='a'
                        href='/document'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        คู่มือการใช้งาน
                      </DisclosureButton>

                      <DisclosureButton
                        as='a'
                        onClick={(e) => {
                          handleSignIn()
                        }}
                        className='block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100'>
                        เข้าสู่ระบบ
                      </DisclosureButton>
                    </div>
                  )}
                </div>
              </DisclosurePanel>
            </>
          )
        }}
      </Disclosure>
    </div>
  )
}