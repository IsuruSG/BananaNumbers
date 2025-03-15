import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import GameModes from "./pages/GameModes/GameModes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/game-modes" element={<GameModes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
