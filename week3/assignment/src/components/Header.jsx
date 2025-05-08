/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TabButton from './TabButton';

function Header({ activeTab, setActiveTab }) {
return (
    <header css={headerStyle}>
        <h2 css={headTextStyle}>숫자야구 || 깃허브 검색 </h2>
        <div>
            <TabButton
                label="깃허브 검색"
                isActive={activeTab === 'github'}
                onClick={() => setActiveTab('github')}
            />
            <TabButton
                label="숫자야구"
                isActive={activeTab === 'baseball'}
                onClick={() => setActiveTab('baseball')}
            />
        </div>
    </header>
);
}

const headerStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 50%;
    border-bottom: 1px solid #ddd;
    text: white;
    background-color: #67AE6E;
    gap: 20px;
    flex-shrink: 0;
`;

const headTextStyle = css`
    padding: 0;
    margin: 0;
    color: white;
`

export default Header;