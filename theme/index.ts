import { createTheme } from '@shopify/restyle'

// IBM Carbon Design System - Gray Scale
const gray = {
  gray10: '#F4F4F4',
  gray20: '#E0E0E0',
  gray30: '#C6C6C6',
  gray40: '#A8A8A8',
  gray50: '#8D8D8D',
  gray60: '#6F6F6F',
  gray70: '#525252',
  gray80: '#393939',
  gray90: '#262626',
  gray100: '#161616',
}

// IBM Carbon - Cool Gray (青みがかったグレー)
const coolGray = {
  coolGray10: '#F2F4F8',
  coolGray20: '#DDE1E6',
  coolGray30: '#C1C7CD',
  coolGray40: '#A2A9B0',
  coolGray50: '#878D96',
  coolGray60: '#697077',
  coolGray70: '#4D5358',
  coolGray80: '#343A3F',
  coolGray90: '#21272A',
  coolGray100: '#121619',
}

// IBM Carbon - Semantic Colors
const semantic = {
  blue60: '#0F62FE',
  blue70: '#0043CE',
  blue80: '#002D9C',
  green50: '#24A148',
  green60: '#198038',
  yellow30: '#F1C21B',
  orange40: '#FF832B',
  red50: '#FA4D56',
  red60: '#DA1E28',
  purple60: '#8A3FFC',
}

const palette = {
  ...gray,
  ...coolGray,
  ...semantic,
  white: '#FFFFFF',
  black: '#000000',
}

const theme = createTheme({
  colors: {
    // Background (Layer tokens)
    background: palette.white,
    backgroundHover: palette.gray10,
    backgroundActive: palette.gray30,
    backgroundSelected: palette.gray20,
    backgroundInverse: palette.gray100,

    // Layer
    layer01: palette.gray10,
    layer02: palette.white,
    layer03: palette.gray10,
    layerHover01: palette.gray20,
    layerHover02: palette.gray10,
    layerActive01: palette.gray30,
    layerSelected01: palette.gray20,

    // Text
    textPrimary: palette.gray100,
    textSecondary: palette.gray70,
    textPlaceholder: palette.gray40,
    textDisabled: palette.gray30,
    textInverse: palette.white,
    textOnColor: palette.white,
    textHelper: palette.gray60,

    // Icon
    iconPrimary: palette.gray100,
    iconSecondary: palette.gray70,
    iconDisabled: palette.gray30,
    iconInverse: palette.white,
    iconOnColor: palette.white,

    // Border
    borderStrong01: palette.gray50,
    borderSubtle00: palette.gray20,
    borderSubtle01: palette.gray30,
    borderDisabled: palette.gray30,
    borderInverse: palette.white,

    // Interactive
    interactive: palette.blue60,
    interactiveHover: palette.blue70,
    interactiveActive: palette.blue80,

    // Support (Semantic)
    supportError: palette.red60,
    supportSuccess: palette.green60,
    supportWarning: palette.yellow30,
    supportInfo: palette.blue60,

    // Focus
    focus: palette.blue60,
    focusInverse: palette.white,

    // Button - Primary
    buttonPrimary: palette.blue60,
    buttonPrimaryHover: palette.blue70,
    buttonPrimaryActive: palette.blue80,

    // Button - Secondary
    buttonSecondary: palette.gray80,
    buttonSecondaryHover: palette.gray70,
    buttonSecondaryActive: palette.gray60,

    // Button - Tertiary
    buttonTertiary: 'transparent',
    buttonTertiaryHover: palette.blue60,
    buttonTertiaryActive: palette.blue80,

    // Button - Ghost
    buttonGhost: 'transparent',
    buttonGhostHover: palette.gray10,
    buttonGhostActive: palette.gray20,

    // Button - Danger
    buttonDanger: palette.red60,
    buttonDangerHover: palette.red50,
    buttonDangerActive: '#750E13', // Carbon danger active

    // Misc
    overlay: 'rgba(22, 22, 22, 0.5)',
    skeleton01: palette.gray10,
    skeleton02: palette.gray30,
  },
  spacing: {
    // Carbon uses 2px base unit (mini unit)
    none: 0,
    '2xs': 2, // 1 mini unit
    xs: 4, // 2 mini units
    s: 8, // 4 mini units
    m: 16, // 8 mini units
    l: 24, // 12 mini units
    xl: 32, // 16 mini units
    '2xl': 40, // 20 mini units
    '3xl': 48, // 24 mini units
    '4xl': 64, // 32 mini units
  },
  borderRadii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    full: 9999,
  },
  textVariants: {
    defaults: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 20,
      color: 'textPrimary',
    },
    // Headings
    heading01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 20,
      color: 'textPrimary',
    },
    heading02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
    heading03: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 20,
      lineHeight: 28,
      color: 'textPrimary',
    },
    heading04: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 28,
      lineHeight: 36,
      color: 'textPrimary',
    },
    heading05: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 32,
      lineHeight: 40,
      color: 'textPrimary',
    },
    heading06: {
      fontFamily: 'Roboto_300Light' as string, // Lightがない場合はRegular
      fontSize: 42,
      lineHeight: 50,
      color: 'textPrimary',
    },
    heading07: {
      fontFamily: 'Roboto_300Light' as string,
      fontSize: 54,
      lineHeight: 64,
      color: 'textPrimary',
    },
    // Body
    bodyCompact01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 18,
      color: 'textPrimary',
    },
    bodyCompact02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 22,
      color: 'textPrimary',
    },
    body01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 20,
      color: 'textPrimary',
    },
    body02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
    // Utility
    code01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textPrimary',
    },
    code02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 20,
      color: 'textPrimary',
    },
    label01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textSecondary',
    },
    label02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 18,
      color: 'textSecondary',
    },
    helperText01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textHelper',
    },
    helperText02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 18,
      color: 'textHelper',
    },
    // Legal/Fine print
    legal01: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textSecondary',
    },
    legal02: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 18,
      color: 'textSecondary',
    },
  },
})

export type Theme = typeof theme
export default theme
