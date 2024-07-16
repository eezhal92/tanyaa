import { useTheme } from "./context/ThemeContext";
import { styled, css } from 'styled-components';
import { AppTheme } from "./theme";


const Wrapper = styled.div<{ theme: AppTheme }>`
  user-select: none;
  text-align: center;

  ${({ theme }) => css`
    color: ${theme.font_color};
    background-color: ${theme.body_color};
    padding: ${theme.spacing(1)}
  `}
`

export default function Announcement({ text }: { text: string }) {
  const t = useTheme()

  const toggle = () => {
    const nextTheme = t.theme === 'dark' ? 'light' : 'dark';
    t.setTheme(nextTheme);
  }

  return (
    <Wrapper role="alert" onClick={toggle}>{text}</Wrapper>
  )
}
