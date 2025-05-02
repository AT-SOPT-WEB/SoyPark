import { useState } from 'react';
import Header from './components/Header';
import GithubPage from './pages/GithubPage';
import NumberBasePage from './pages/NumberBaseballPage';


function App() {
  const [activeTab, setActiveTab] = useState('github');

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'github' ? <GithubPage /> : <NumberBasePage />}
    </div>
  );
}

export default App;

