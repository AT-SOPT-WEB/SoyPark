import { useState } from 'react';
import Header from './components/Header';
import GithubPage from './pages/GithubSearch/GithubPage';
import NumberBasePage from './pages/NumberBaseBall/NumberBaseballPage';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle'


function App() {
  const [activeTab, setActiveTab] = useState('github');

  return (
    <div>
      <GlobalStyle />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div css={ContentWrapper}>
        {activeTab === 'github' ? <GithubPage /> : <NumberBasePage />}
      </div>
    </div>
  );
}

export default App;

const ContentWrapper = css`
  display: flex;
  height: 80vh;
`
