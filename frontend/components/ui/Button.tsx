'use client'

import { colorMapperButton } from '@/utils/color'
import { Button as HeadlessButton } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

export default function Button({
  id,
  children,
  className,
  variant,
  color,
  rounded,
  onClick,
  href,
  target,
  wFit,
  title,
  disabled,
  type = 'button',
  isReady = true,
}: ButtonProps) {
  // General class name
  const baseClassName = [
    'flex flex-row items-center justify-center gap-2 p-2',
    'text-nowrap',
    'transition-all duration-200',
    // --- Spacing (Condition) ---
    wFit ? 'w-fit' : 'w-full',
    // --- Borders (Condition) ---
    rounded ? 'rounded-full' : 'rounded-md',
    // --- Variants ---
    (variant === 'primary' || variant == null || variant == undefined) &&
      colorMapperButton(color),
    variant === 'secondary' && colorMapperButton(color, 'secondary'),
    variant === 'text' && colorMapperButton(color, 'text'),
    // --- Disabled ---
    (!isReady || disabled) && 'cursor-not-allowed opacity-50',
    // --- Custom ---
    className,
  ]

  // Handle the click event
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick()
    } else {
      return
    }
  }

  if (href && !disabled && isReady) {
    return (
      <Link
        id={`button-${id}`}
        href={href}
        target={target}
        className={clsx(baseClassName)}
        onClick={handleClick}
        title={title}>
        {children}
      </Link>
    )
  } else {
    return (
      <HeadlessButton
        id={`button-${id}`}
        onClick={handleClick}
        disabled={disabled || !isReady}
        className={clsx(baseClassName)}
        title={title}
        type={type}>
        {isReady ? children : 
          <div className='flex h-full w-full flex-row items-center justify-center gap-2'>
            <LoadingSpinner className='!size-6' /> กำลังประมวลผล
          </div>
        }
      </HeadlessButton>
    )
  }
}

interface ButtonProps {
  id?: string
  children: React.ReactNode
  className?: string
  variant?: string
  color?: string
  rounded?: boolean
  onClick?: Function
  href?: string
  target?: string
  wFit?: boolean
  title?: string
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  isReady?: boolean
}