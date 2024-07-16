export interface Palette {
  900: string
  800: string
  700: string
  600: string
  500: string
  400: string
  300: string
  200: string
  100: string
  50: string
}

export type BreakpointVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type AppTheme = {
  font_color: string
  font_family: string
  body_color: string
  primary_color: string
  secondary_color: string
  border_color: string
  light_grey: string
  // Consts
  spacing_unit: number
  palette: {
    primary: Palette
    secondary: Palette
    grey: Palette
    black: string
    white: string
  }
  typography: {
    baseSize: number
    multiplier: number
  }
  breakpoints: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  // Functions
  spacing: (multiplier: number, type?: 'rem' | 'px') => string
  fontSize: (scale: number) => string
  media: (breakpoint: BreakpointVariant) => string
  maxMedia: (breakpoint: BreakpointVariant) => string
}
