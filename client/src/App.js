import { Routes, Route } from "react-router-dom";
import React from "react";
import Coins from "./Components/Coins/Coins";
import Home from "./Components/Home/Home";
import "./App.css";
import CoinDetails from "./Components/CoinDetails/CoinDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/coins" element={<Coins />}></Route>
      <Route path="/:id" element={<CoinDetails />}></Route>
    </Routes>
  );
}

export default App;
