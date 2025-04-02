import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import GameModes from "./pages/GameModes/GameModes";
import ClassicMode from "./pages/GameModes/ClassicMode/ClassicMode";
// import EpicMode from "./pages/GameModes/EpicMode/EpicMode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/classic-mode" element={<ClassicMode />} />
        {/* <Route path="/epic-mode" element={<EpicMode />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
