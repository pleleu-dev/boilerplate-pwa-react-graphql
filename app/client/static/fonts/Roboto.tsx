import { createGlobalStyle } from "styled-components";

import RobotoBoldTTF from "@fonts/Roboto-Bold.ttf";
import RobotoRegularTTF from "@fonts/Roboto-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoBoldTTF}) format('truetype');
        font-weight: bold;
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoRegularTTF}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;
