'use client'

import Button from '@/components/ui/Button'
import { colorMapperButton } from '@/utils/color'
import { useModal } from '@/providers/ModalProvider'
import Image from 'next/image'
import TextField from './TextField'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Divider from '@/components/ui/Divider'

export default function BasicModal({
  id,
  color = 'gray',
  title,
  imageURL,
  message,
  inputLabel = 'ข้อความ',
  inputPlaceholder = 'กรุณาระบุข้อความ',
  inputRequired = false,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmWithMessageModalProps) {
  const { closeModal } = useModal()
  const [input, setInput] = useState('')

  const handleConfirm = () => {
    // Validate required message
    if (inputRequired && !input.trim()) {
      return 
    }

    if (onConfirm) onConfirm(input.trim() || undefined)
    closeModal()
    setInput('')
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    closeModal()
    setInput('')
  }

  return (
    <div className={'w-full relative max-h-screen sm:w-fit sm:min-w-[440px] bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden'}>
      {title && (
        <div className='flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-4'>
          <h2 className='text-lg font-medium'>{title}</h2>
          <button
            onClick={() => closeModal()}
            className='rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800'>
            <XMarkIcon className='h-6 w-6' />
          </button>
        </div>
      )}
      <div className='flex flex-col'>
        {/* Body content */}
        <div className='flex flex-col gap-y-6 p-4'>
          {imageURL &&
          <div className='flex justify-center'>
            <Image src={imageURL} alt='Modal-Image' width={154} height={154} sizes='100vw' priority />
          </div>    
          }

          <div className='flex items-center gap-3'>
            {/* message */}
            <p id={`confirmModal-detail-${id}`} className='text-gray-700'>
              {message}
            </p>
          </div>

          {/* Message Input */}
          {inputRequired &&
            <TextField
              id={`confirmModal-message-${id}`}
              label={inputLabel + (inputRequired ? ' (บังคับ)' : ' (ไม่บังคับ)')}
              placeholder={inputPlaceholder}
              value={input}
              onChange={(value: string) => setInput(value)}
              required={inputRequired}
            />
          }
        </div>
        
        <Divider />
        
        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pr-2 pb-2'>
          {cancelText &&
            <Button
              id={`confirmModal-cancel-${id}`}
              className='w-fit max-w-[77px] h-[32px]'
              variant='secondary'
              onClick={handleCancel}>
              {cancelText ? cancelText : 'ยกเลิก'}
            </Button>
          }
          {confirmText && 
            <Button
              id={`confirmModal-confirm-${id}`}
              className={clsx('w-fit max-w-[77px] h-[32px]' , colorMapperButton(color))}
              onClick={handleConfirm}
              disabled={inputRequired && !input.trim()}>
              {confirmText ? confirmText : 'ยืนยัน'}
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

interface ConfirmWithMessageModalProps {
  id?: string
  color?: string
  title?: string
  imageURL?: string
  message: React.ReactNode
  inputLabel?: string
  inputPlaceholder?: string
  inputRequired?: boolean
  confirmText?: React.ReactNode
  cancelText?: React.ReactNode
  onConfirm?: Function
  onCancel?: Function
}