import { PropsWithChildren, createContext, useContext, useState } from "react"
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "../theme";

export type Theme = 'dark' | 'light'
export const ThemeContext = createContext<{
  theme: Theme,
  setTheme: (theme: Theme) => void
}>({ theme: 'dark', setTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ defaultTheme = 'dark', children }: PropsWithChildren<{ defaultTheme: Theme }>) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
