import { createGlobalStyle } from 'styled-components';
import { COLORS } from './constants/colors';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    * {
 -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
    html {
        font-size: 62.5%;
    }

    body {
        color: inherit;
    
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${COLORS['grey-200']};
        border-radius: 5px;
    }
    ::-webkit-scrollbar {
        display : none;
        width: 6px;
        height: 6px;

        @media only screen and (min-width: 785px) {
    display: block;
    }
    }
    ::-webkit-scrollbar-track {
        background-color: ${COLORS['grey-600']};
    }
`;

export default GlobalStyle;
