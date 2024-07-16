import common from './common'
import type { AppTheme } from './app-theme'

const light: AppTheme = {
  ...common,
  font_color: '#000',
  font_family: 'Lexend Deca',
  body_color: '#ffffff',
  primary_color: '#234FEB',
  secondary_color: '#89B641',
  border_color: '#EBEBEB',
  light_grey: '#FBFBFB',
  palette: {
    ...common.palette,
    primary: {
      900: '#234FEB',
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
      800: '#333333',
      700: '',
      600: '#555555',
      500: '#919191',
      400: '',
      300: '#EBEBEB',
      200: '',
      100: '#F3F3F3',
      50: '#FBFBFB',
    },
  },
  typography: {
    baseSize: 16,
    multiplier: 1.25,
  },
}

export default light
