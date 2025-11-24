import { FullColorListInterface } from '@/interface/common'
import bgFullColorList from './fullColorList/bgFullColorList.json'
import borderFullColorList from './fullColorList/borderFullColorList.json'
import outlineFullColorList from './fullColorList/outlineFullColorList.json'
import ringFullColorList from './fullColorList/ringFullColorList.json'
import strokeFullColorList from './fullColorList/strokeFullColorList.json'
import textFullColorList from './fullColorList/textFullColorList.json'

const bgFullColorListJson = bgFullColorList as FullColorListInterface
const borderFullColorListJson = borderFullColorList as FullColorListInterface
const outlineFullColorListJson = outlineFullColorList as FullColorListInterface
const ringFullColorListJson = ringFullColorList as FullColorListInterface
const strokeFullColorListJson = strokeFullColorList as FullColorListInterface
const textFullColorListJson = textFullColorList as FullColorListInterface

// This function use to map color ---------------------------------------
export function colorMapper({
  type,
  color,
  level,
  variants,
  specialVariants,
}: ColorMapperProps) {
  if (!color || !getColorSet().includes(color)) {
    color = 'indigo'
  } else if (color === 'black' || color === 'white') {
    level = 'none'
  }
  level = level || '600'
  variants = variants || 'none'
  specialVariants = specialVariants || 'none'

  let colorClass
  try {
    switch (type) {
      case 'bg':
        colorClass =
          bgFullColorListJson[specialVariants][variants][color][level]
        break
      case 'border':
        colorClass =
          borderFullColorListJson[specialVariants][variants][color][level]
        break
      case 'outline':
        colorClass =
          outlineFullColorListJson[specialVariants][variants][color][level]
        break
      case 'ring':
        colorClass =
          ringFullColorListJson[specialVariants][variants][color][level]
        break
      case 'stroke':
        colorClass =
          strokeFullColorListJson[specialVariants][variants][color][level]
        break
      case 'text':
        colorClass =
          textFullColorListJson[specialVariants][variants][color][level]
        break
      default:
        colorClass = ''
    }
  } catch (error) {
    console.error(`Error mapping color: ${error}`)
  }

  return colorClass
}

interface ColorMapperProps {
  color?: string
  level?: string | number
  type: 'text' | 'bg' | 'border' | 'outline' | 'ring' | 'stroke'
  variants?: string
  specialVariants?: string
}

// This function is used to map the color to the chip class ---------------------------------------
export function colorMapperChip(color: string | undefined | null) {
  switch (color) {
    case 'gray':
      return 'text-gray-900 bg-gray-100'
    case 'red':
      return 'text-red-700 bg-red-100'
    case 'orange':
      return 'text-orange-700 bg-orange-100'
    case 'amber':
      return 'text-amber-700 bg-amber-100'
    case 'yellow':
      return 'text-yellow-700 bg-yellow-100'
    case 'lime':
      return 'text-lime-700 bg-lime-100'
    case 'green':
      return 'text-green-700 bg-green-100'
    case 'emerald':
      return 'text-emerald-700 bg-emerald-100'
    case 'teal':
      return 'text-teal-700 bg-teal-100'
    case 'cyan':
      return 'text-cyan-700 bg-cyan-100'
    case 'sky':
      return 'text-sky-700 bg-sky-100'
    case 'blue':
      return 'text-blue-700 bg-blue-100'
    case 'indigo':
      return 'text-indigo-700 bg-indigo-100'
    case 'violet':
      return 'text-violet-700 bg-violet-100'
    case 'purple':
      return 'text-purple-700 bg-purple-100'
    case 'fuchsia':
      return 'text-fuchsia-700 bg-fuchsia-100'
    case 'pink':
      return 'text-pink-700 bg-pink-100'
    case 'rose':
      return 'text-rose-700 bg-rose-100'
    default:
      return 'text-indigo-700 bg-indigo-100'
  }
}

// This function is used to map the color to the button class ---------------------------------------
export function colorMapperButton(
  color: string | undefined | null,
  variant?: string
) {
  if (color === 'black') {
    color = 'gray'
  }

  if (
    variant !== 'secondary' &&
    variant !== 'text' &&
    (!color || !getColorSet().filter((c) => c === color))
  ) {
    color = color || 'indigo'
  } else if (!color || !getColorSet().filter((c) => c === color)) {
    color = color || 'gray'
  }

  if (!variant || variant === 'primary') {
    switch (color) {
      case 'white':
        return `${colorMapper({ type: 'bg', color, level: 200 })} ${colorMapper({ type: 'text', color: 'gray', level: 700 })} ${colorMapper({ type: 'bg', color: 'gray', level: 100, variants: 'hover' })}`
      case 'gray':
        return `${colorMapper({ type: 'bg', color, level: 900 })} ${colorMapper({ type: 'text', color: 'white' })} ${colorMapper({ type: 'bg', color, level: 800, variants: 'hover' })}`
      case 'yellow':
        return `${colorMapper({ type: 'bg', color, level: 500 })} ${colorMapper({ type: 'text', color: 'white' })} ${colorMapper({ type: 'bg', color, level: 700, variants: 'hover' })}`
      default:
        return `${colorMapper({ type: 'bg', color, level: 600 })} ${colorMapper({ type: 'text', color: 'white' })} ${colorMapper({ type: 'bg', color, level: 700, variants: 'hover' })}`
    }
  } else if (variant === 'secondary') {
    switch (color) {
      case 'white':
        return `border ${colorMapper({ type: 'border', color })} ${colorMapper({ type: 'text', color })} ${colorMapper({ type: 'bg', color: 'gray', level: 800, variants: 'hover' })}`
      default:
        return `border ${colorMapper({ type: 'border', color, level: 200 })} bg-transparent ${colorMapper({ type: 'text', color, level: 700 })} ${colorMapper({ type: 'bg', color: color, level: 100, variants: 'hover' })}`
    }
  } else {
    switch (color) {
      case 'white':
        return `${colorMapperText(color)} ${colorMapper({ type: 'bg', color: 'gray', level: 800, variants: 'hover' })}`
      default:
        return `${colorMapperText(color)} ${colorMapper({ type: 'bg', color: color, level: 100, variants: 'hover' })}`
    }
  }
}

// This function is used to map the color to the menu class ---------------------------------------
export function colorMapperMenu(color: string | undefined | null) {
  switch (color) {
    case 'gray':
      return 'text-gray-900 bg-white hover:bg-gray-100'
    case 'red':
      return 'text-gray-900 bg-white hover:bg-red-100 hover:text-red-600'
    case 'orange':
      return 'text-gray-900 bg-white hover:bg-orange-100 hover:text-orange-600'
    case 'amber':
      return 'text-gray-900 bg-white hover:bg-amber-100 hover:text-amber-600'
    case 'yellow':
      return 'text-gray-900 bg-white hover:bg-yellow-100 hover:text-yellow-700'
    case 'lime':
      return 'text-gray-900 bg-white hover:bg-lime-100 hover:text-lime-600'
    case 'green':
      return 'text-gray-900 bg-white hover:bg-green-100 hover:text-green-700'
    case 'emerald':
      return 'text-gray-900 bg-white hover:bg-emerald-100 hover:text-emerald-600'
    case 'teal':
      return 'text-gray-900 bg-white hover:bg-teal-100 hover:text-teal-600'
    case 'cyan':
      return 'text-gray-900 bg-white hover:bg-cyan-100 hover:text-cyan-600'
    case 'sky':
      return 'text-gray-900 bg-white hover:bg-sky-100 hover:text-sky-600'
    case 'blue':
      return 'text-gray-900 bg-white hover:bg-blue-100 hover:text-blue-600'
    case 'indigo':
      return 'text-gray-900 bg-white hover:bg-indigo-100 hover:text-indigo-600'
    case 'violet':
      return 'text-gray-900 bg-white hover:bg-violet-100 hover:text-violet-600'
    case 'purple':
      return 'text-gray-900 bg-white hover:bg-purple-100 hover:text-purple-600'
    case 'fuchsia':
      return 'text-gray-900 bg-white hover:bg-fuchsia-100 hover:text-fuchsia-600'
    case 'pink':
      return 'text-gray-900 bg-white hover:bg-pink-100 hover:text-pink-600'
    case 'rose':
      return 'text-gray-900 bg-white hover:bg-rose-100 hover:text-rose-600'
    default:
      return 'text-indigo-600 bg-white hover:bg-indigo-100'
  }
}

// This function is used to map the color to the text class ---------------------------------------
export function colorMapperText(color: string | undefined | null) {
  switch (color) {
    case 'gray':
      return 'text-gray-900'
    case 'red':
      return 'text-red-600'
    case 'orange':
      return 'text-orange-600'
    case 'amber':
      return 'text-amber-600'
    case 'yellow':
      return 'text-yellow-600'
    case 'lime':
      return 'text-lime-600'
    case 'green':
      return 'text-green-600'
    case 'emerald':
      return 'text-emerald-600'
    case 'teal':
      return 'text-teal-600'
    case 'cyan':
      return 'text-cyan-600'
    case 'sky':
      return 'text-sky-600'
    case 'blue':
      return 'text-blue-600'
    case 'indigo':
      return 'text-indigo-600'
    case 'violet':
      return 'text-violet-600'
    case 'purple':
      return 'text-purple-600'
    case 'fuchsia':
      return 'text-fuchsia-600'
    case 'pink':
      return 'text-pink-600'
    case 'rose':
      return 'text-rose-600'
    default:
      return 'text-indigo-600'
  }
}

// This function use to random color for the text ---------------------------------------
export function randomColor() {
  const colors = [
    'gray',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

// This function use to export color set for the text ---------------------------------------
export function getColorSet() {
  return [
    'gray',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'black',
    'white',
  ]
}

// This function is used to map the color to the tag class ---------------------------------------
const tagColorClasses: Record<string, string> = {
  gray: 'bg-gray-600',
  red: 'bg-red-600',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-500',
  green: 'bg-green-600',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-600',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-600',
}

export function colorMapperTag(color: string | undefined | null) {
  if (color?.startsWith('bg-')) {
    return color
  }

  return tagColorClasses[color || ''] || 'bg-neutral-300'
}