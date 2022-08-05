import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DailyMode from "./components/games/dailyMode/DailyMode";
import FreeMode from "./components/games/freeMode/FreeMode.js";
import RandomOnlineMode from "./components/games/onlineMode/random/RandomOnlineMode";
import Header from "./components/main/Header.js";
import Modal from "./components/modals/Modal.js";

function App() {
  return (
    <div className="main">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Modal />} />
          <Route path="/serbest-mod" element={<FreeMode />} />
          <Route path="/gunluk-mod" element={<DailyMode />} />
          <Route path="/online-mod" element={<RandomOnlineMode />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
