import common from './common'
import type { AppTheme } from './app-theme'

const dark: AppTheme = {
  ...common,
  font_color: '#fff',
  font_family: 'Segoe UI',
  body_color: '#000000',
  primary_color: '#2C2971',
  secondary_color: '#89B641',
  border_color: '#EBEBEB',
  light_grey: '#FBFBFB',
  palette: {
    ...common.palette,
    primary: {
      900: '#2C2971',
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
      800: '',
      700: '',
      600: '',
      500: '#919191',
      400: '',
      300: '',
      200: '',
      100: '',
      50: '',
    },
  },
}

export default dark
