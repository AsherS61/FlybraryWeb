'use client'

import clsx from 'clsx'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function LoadingModal({
  id,
  color,
  message = 'กำลังโหลด...',
} : ModalProps) {
  return (
    <div className={'w-full relative max-h-screen sm:w-fit sm:min-w-[440px] p-6 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden'}>
      <div className="flex flex-col gap-y-6 items-center">
        <LoadingSpinner className='!size-24'></LoadingSpinner>
        <p className="text-gray-700 text-center">{message}</p>
      </div>
    </div>
  )
}

interface ModalProps {
  id?: string 
  color?: string
  message?: string
}