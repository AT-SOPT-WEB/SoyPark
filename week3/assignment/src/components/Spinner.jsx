/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const LoadingSpinner = () => {
    return (
        <div css={spinnerStyle} role="status" aria-label="로딩 중...">
            <span css={spanStyle}>로딩 중...</span>
        </div>
    )
};

const spinnerStyle = css`
    width: 48px;
    height: 48px;
    border: 6px solid #67AE6E;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${spin} 3s linear infinite;
    margin-top: 20px;
`;

const spanStyle = css`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
`