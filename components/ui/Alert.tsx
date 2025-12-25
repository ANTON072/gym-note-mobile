import { Pressable } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { Ionicons } from '@expo/vector-icons'

import type { Theme } from '@/theme'
import Box from '../common/Box'
import Text from '../common/Text'

type AlertSeverity = 'error' | 'warning' | 'info' | 'success'
type AlertVariant = 'filled' | 'standard'

interface AlertProps {
  /** アラートの種類 */
  severity?: AlertSeverity
  /** 表示スタイル */
  variant?: AlertVariant
  /** タイトル（オプション） */
  title?: string
  /** メッセージ */
  children: React.ReactNode
  /** 閉じるボタンを表示 */
  closable?: boolean
  /** 閉じるボタン押下時のコールバック */
  onClose?: () => void
  /** アイコンを非表示 */
  hideIcon?: boolean
}

// severity に対応するアイコン名
const iconMap: Record<AlertSeverity, keyof typeof Ionicons.glyphMap> = {
  error: 'alert-circle-outline',
  warning: 'warning-outline',
  info: 'information-circle-outline',
  success: 'checkmark-circle-outline',
}

const Alert = ({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  closable = false,
  onClose,
  hideIcon = false,
}: AlertProps) => {
  const theme = useTheme<Theme>()

  // severity に応じた色を取得
  const getColors = () => {
    const colorMap: Record<
      AlertSeverity,
      {
        main: keyof Theme['colors']
        background: string
        icon: string
        text: keyof Theme['colors']
        border: string
      }
    > = {
      error: {
        main: 'supportError',
        background:
          variant === 'filled' ? theme.colors.supportError : '#FFF1F1',
        icon: variant === 'filled' ? '#FFFFFF' : theme.colors.supportError,
        text: variant === 'filled' ? 'textOnColor' : 'textPrimary',
        border: theme.colors.supportError,
      },
      warning: {
        main: 'supportWarning',
        background:
          variant === 'filled' ? theme.colors.supportWarning : '#FFF8E1',
        icon: variant === 'filled' ? '#000000' : '#8A6D00',
        text: variant === 'filled' ? 'textPrimary' : 'textPrimary',
        border: theme.colors.supportWarning,
      },
      info: {
        main: 'supportInfo',
        background: variant === 'filled' ? theme.colors.supportInfo : '#EDF5FF',
        icon: variant === 'filled' ? '#FFFFFF' : theme.colors.supportInfo,
        text: variant === 'filled' ? 'textOnColor' : 'textPrimary',
        border: theme.colors.supportInfo,
      },
      success: {
        main: 'supportSuccess',
        background:
          variant === 'filled' ? theme.colors.supportSuccess : '#DEFBE6',
        icon: variant === 'filled' ? '#FFFFFF' : theme.colors.supportSuccess,
        text: variant === 'filled' ? 'textOnColor' : 'textPrimary',
        border: theme.colors.supportSuccess,
      },
    }
    return colorMap[severity]
  }

  const colors = getColors()

  return (
    <Box
      flexDirection="row"
      padding="m"
      borderRadius="s"
      borderLeftWidth={variant === 'standard' ? 3 : 0}
      style={{
        backgroundColor: colors.background,
        borderLeftColor: colors.border,
        gap: theme.spacing.s,
      }}
    >
      {/* アイコン */}
      {!hideIcon && (
        <Ionicons name={iconMap[severity]} size={20} color={colors.icon} />
      )}

      {/* コンテンツ */}
      <Box flex={1} style={{ gap: theme.spacing.xs }}>
        {title && (
          <Text
            variant="label02"
            color={colors.text}
            style={{ fontFamily: 'Roboto_500Medium' }}
          >
            {title}
          </Text>
        )}
        <Text variant="body01" color={colors.text}>
          {children}
        </Text>
      </Box>

      {/* 閉じるボタン */}
      {closable && onClose && (
        <Pressable onPress={onClose} hitSlop={8}>
          <Box padding="xs">
            <Ionicons name="close" size={16} color={colors.icon} />
          </Box>
        </Pressable>
      )}
    </Box>
  )
}

export default Alert
