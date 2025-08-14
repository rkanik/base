import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ComponentType } from 'react'
import { type TThemeColor, useThemeColors } from './Theme'

export type TIconProps = {
  name: string
  size?: number
  color?: TThemeColor | string
  library?: ComponentType<any>
}

export const Icon = ({ library: Library = MaterialIcons, name, size, color }: TIconProps) => {
  const { colors } = useThemeColors()
  return (
    <Library
      name={name}
      size={size}
      color={color ? colors[color as TThemeColor] || color : colors.basef}
    />
  )
}
