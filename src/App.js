import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DailyMode from "./components/games/dailyMode/DailyMode";
import FreeMode from "./components/games/freeMode/FreeMode.js";
import Header from "./components/main/Header.js";
import Modal from "./components/modals/Modal.js";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Modal />} />
          <Route path="/serbest-mod" element={<FreeMode />} />
          <Route path="/gunluk-mod" element={<DailyMode />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
