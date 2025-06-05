import { useState } from 'react';
import Header from './components/Header';
import GithubPage from './pages/GithubSearch/GithubPage';
import NumberBasePage from './pages/NumberBaseBall/NumberBaseballPage';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle'


function App() {
  const [activeTab, setActiveTab] = useState('github');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <GlobalStyle />
      <Header activeTab={activeTab} onClick={handleTabClick} />
      <div css={ContentWrapper}>
        {activeTab === 'github' && <GithubPage />}
        {activeTab === 'baseball' && <NumberBasePage />}
      </div>
    </div>
  );
}

export default App;

const ContentWrapper = css`
  display: flex;
  height: 80vh;
`
