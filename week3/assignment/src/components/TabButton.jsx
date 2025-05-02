/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function TabButton({ label, isActive, onClick }) {
    return (
        <button css={tabStyle(isActive)} onClick={onClick}>
            {label}
        </button>
    );
}

const tabStyle = (isActive) => css`
    padding: 8px 16px;
    margin-right: 13px;
    font-weight: bold;
    background: ${isActive ? '#333' : '#90C67C'};
    color: ${isActive ? 'white' : 'black'};
    border: none;
    border-radius: 4px;

    gap: 10px;
    cursor: pointer;

    &:hover {
        background: ${isActive ? '#555' : '#ddd'};
    }
`;

export default TabButton;
