'use client'

import clsx from 'clsx'
import { colorMapperButton } from '@/utils/color'
import { useModal } from '@/providers/ModalProvider'
import Button from '@/components/ui/Button'

export default function AlertModal({
  id,
  color = 'grey',
  confirmText,
  onConfirm,
} : ModalProps) {
  const { closeModal } = useModal()

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    closeModal()
  }

  return (
    <div className={'w-full relative max-h-screen sm:w-fit sm:min-w-[440px] p-6 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden'}>
      <div className="flex flex-col gap-y-6">


        <Button
          id={`alertModal-confirm-${id}`}
          variant='custom'
          className={colorMapperButton(color)}
          onClick={handleConfirm}>
          {confirmText ? confirmText : 'ตกลง'}
        </Button>
      </div>
    </div>
  )
}

interface ModalProps {
  id?: string 
  color?: string
  confirmText?: string
  onConfirm?: Function
}