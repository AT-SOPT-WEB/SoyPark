import Router from "./router/Router";
import "./styles/global.css";
import { themeClass } from "./styles/theme.css";

function App() {

  return (
    <div className={themeClass}>
      <Router />
    </div>
  )
}

export default App
