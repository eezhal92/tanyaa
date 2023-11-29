import { useTheme } from "./context/ThemeContext";

export default function Announcement({ text }: { text: string }) {
  const t = useTheme()
  let style = { background: 'white', color: 'black' }
  if (t.theme === 'dark') {
    style.background = 'black';
    style.color = 'white'
  }
  return (
    <div role="alert" style={style}>{text}:{t.theme}</div>
  )
}
