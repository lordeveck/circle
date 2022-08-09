import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DailyMode from "./components/games/dailyMode/DailyMode";
import FreeMode from "./components/games/freeMode/FreeMode.js";
import Header from "./components/main/Header.js";
import Modal from "./components/modals/Modal.js";
import { DifficultyProvider } from "./context/difficulty";

function App() {
  return (
    <div className="main">
      <DifficultyProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Modal />} />
            <Route path="/serbest-mod" element={<FreeMode />} />
            <Route path="/gunluk-mod" element={<DailyMode />} />
          </Routes>
        </BrowserRouter>
      </DifficultyProvider>
    </div >
  );
}

export default App;
