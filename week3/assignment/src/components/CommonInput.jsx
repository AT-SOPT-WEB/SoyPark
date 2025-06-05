/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function CommonInput(props) {
    return (
        <input
            type="text"
            {...props}
            css={inputStyle}
        />
    );
}

const inputStyle = css`
    width: 50%;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid #328E6E;
    background-color: #E1EEBC;
    margin-top: 30px;
`;

export default CommonInput;