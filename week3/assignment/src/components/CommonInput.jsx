/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function CommonInput({ value, onChange, onKeyDown, placeholder }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
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
`;

export default CommonInput;