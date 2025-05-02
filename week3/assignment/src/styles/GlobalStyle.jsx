/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        height: 100%;
        font-family: 'Pretendard', sans-serif;
      }

      h1, h2, h3, h4, h5, h6,
      p, article, section, ul, ol, li {
        margin: 0;
        padding: 0;
      }

      ul, ol {
        list-style: none;
      }

      a {
        text-decoration: none;
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyle;
