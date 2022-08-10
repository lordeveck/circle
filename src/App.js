import './App.css';
import Main from "./components/main/Main";
import { GameFeatureProvider } from "./context/GameFeature";

function App() {
  return (
    <GameFeatureProvider>
      <Main />
    </GameFeatureProvider>
  );
}

export default App;
