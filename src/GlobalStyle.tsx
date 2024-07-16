import { createGlobalStyle, css } from "styled-components";
import { AppTheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: AppTheme; }>`
  ${({ theme }) => css`
  body {
    color: ${theme.font_color};
    font-size: 16px;
  }
  `}
`;

export default GlobalStyle
