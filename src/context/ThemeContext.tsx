import { PropsWithChildren, createContext, useContext, useState } from "react"

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
      {children}
    </ThemeContext.Provider>
  )
}
