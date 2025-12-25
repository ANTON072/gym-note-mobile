import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { useTheme } from '@shopify/restyle'

import type { Theme } from '@/theme'
import Box from '../common/Box'
import Text from '../common/Text'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** ボタンのラベル */
  children: string
  /** ボタンのバリアント */
  variant?: ButtonVariant
  /** ボタンのサイズ */
  size?: ButtonSize
  /** 無効状態 */
  disabled?: boolean
  /** ローディング状態 */
  loading?: boolean
  /** フルワイドボタン */
  fullWidth?: boolean
  /** アイコン（左側） */
  iconLeft?: React.ReactNode
  /** アイコン（右側） */
  iconRight?: React.ReactNode
  /** カスタムスタイル */
  style?: StyleProp<ViewStyle>
}

// Carbon Design System のボタン高さ
const sizeStyles: Record<
  ButtonSize,
  { height: number; paddingHorizontal: number }
> = {
  sm: { height: 32, paddingHorizontal: 16 },
  md: { height: 40, paddingHorizontal: 16 },
  lg: { height: 48, paddingHorizontal: 16 },
  xl: { height: 64, paddingHorizontal: 16 },
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  style,
  ...pressableProps
}: ButtonProps) => {
  const theme = useTheme<Theme>()

  const getBackgroundColor = (pressed: boolean): keyof Theme['colors'] => {
    if (disabled) return 'textDisabled'

    switch (variant) {
      case 'primary':
        return pressed ? 'buttonPrimaryActive' : 'buttonPrimary'
      case 'secondary':
        return pressed ? 'buttonSecondaryActive' : 'buttonSecondary'
      case 'tertiary':
        return pressed ? 'buttonTertiaryActive' : 'buttonTertiary'
      case 'ghost':
        return pressed ? 'buttonGhostActive' : 'buttonGhost'
      case 'danger':
        return pressed ? 'buttonDangerActive' : 'buttonDanger'
      default:
        return 'buttonPrimary'
    }
  }

  const getTextColor = (pressed: boolean): keyof Theme['colors'] => {
    if (disabled) return 'textOnColor'

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return 'textOnColor'
      case 'tertiary':
        return pressed ? 'textOnColor' : 'interactive'
      case 'ghost':
        return 'interactive'
      default:
        return 'textOnColor'
    }
  }

  const getBorderColor = (): keyof Theme['colors'] | undefined => {
    if (disabled) return undefined
    if (variant === 'tertiary') return 'interactive'
    return undefined
  }

  const sizeConfig = sizeStyles[size]
  const borderColor = getBorderColor()

  return (
    <Pressable
      disabled={disabled || loading}
      {...pressableProps}
      style={[fullWidth && { width: '100%' }, style]}
    >
      {({ pressed }) => (
        <Box
          height={sizeConfig.height}
          paddingHorizontal="m"
          backgroundColor={getBackgroundColor(pressed)}
          borderRadius="none"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          borderWidth={borderColor ? 1 : 0}
          borderColor={borderColor}
          opacity={disabled ? 0.5 : 1}
          style={{
            gap: theme.spacing.s,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors[getTextColor(pressed)]}
            />
          ) : (
            <>
              {iconLeft}
              <Text
                variant={size === 'sm' ? 'label01' : 'label02'}
                color={getTextColor(pressed)}
                style={{ fontFamily: 'Roboto_500Medium' }}
              >
                {children}
              </Text>
              {iconRight}
            </>
          )}
        </Box>
      )}
    </Pressable>
  )
}

export default Button
