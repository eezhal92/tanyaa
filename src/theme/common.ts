import type { AppTheme } from './app-theme'

const common: AppTheme = {
  // Overwrite theme specific ones here
  font_color: '',
  font_family: '',
  body_color: '',
  primary_color: '',
  secondary_color: '',
  border_color: '',
  light_grey: '',
  palette: {
    primary: {
      900: '#2C2971',
      800: '#4C2F82',
      700: '',
      600: '',
      500: '',
      400: '',
      300: '',
      200: '',
      100: '',
      50: '',
    },
    secondary: {
      900: '#89B641',
      800: '',
      700: '',
      600: '',
      500: '',
      400: '',
      300: '',
      200: '',
      100: '',
      50: '',
    },
    grey: {
      900: '#000000',
      800: '#282828',
      700: '',
      600: '',
      500: '#919191',
      400: '',
      300: '',
      200: '',
      100: '',
      50: '',
    },
    black: '#000000',
    white: '#ffffff',
  },
  typography: {
    baseSize: 16,
    multiplier: 1.25,
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  },

  // Constants
  spacing_unit: 8,

  // Functions
  spacing: (multiplier, type = 'rem') => {
    if (type === 'rem') {
      return `${(multiplier * common.spacing_unit) / 10}rem`
    }
    return `${multiplier * common.spacing_unit}px`
  },

  fontSize: scale => {
    const { baseSize, multiplier } = common.typography
    const baseSizeRem = baseSize / 16 // Convert base size to rem

    if (scale === 1) {
      return `${baseSizeRem}rem`
    }

    return `${baseSizeRem * multiplier ** (scale - 1)}rem`
  },

  media: breakpoint => {
    const { xs, sm, md, lg, xl } = common.breakpoints

    switch (breakpoint) {
      case 'xs':
        return `@media only screen and (min-width: ${xs}px)`
      case 'sm':
        return `@media only screen and (min-width: ${sm}px)`
      case 'md':
        return `@media only screen and (min-width: ${md}px)`
      case 'lg':
        return `@media only screen and (min-width: ${lg}px)`
      case 'xl':
        return `@media only screen and (min-width: ${xl}px)`
      default:
        return ''
    }
  },

  maxMedia: breakpoint => {
    const { xs, sm, md, lg, xl } = common.breakpoints

    switch (breakpoint) {
      case 'xs':
        return `@media only screen and (max-width: ${xs - 1}px)`
      case 'sm':
        return `@media only screen and (max-width: ${sm - 1}px)`
      case 'md':
        return `@media only screen and (max-width: ${md - 1}px)`
      case 'lg':
        return `@media only screen and (max-width: ${lg - 1}px)`
      case 'xl':
        return `@media only screen and (max-width: ${xl - 1}px)`
      default:
        return ''
    }
  },
}

export default common
