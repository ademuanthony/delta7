import React from "react";
import { Route, Routes } from "react-router";

// import logo from './logo.svg';
// import './App.css';
import Home from "./screens/index"
import ComingSoon from "./screens/ComingSoon/ComingSoon";
import Minting from "./screens/Minting/Minting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/nft-market" element={<ComingSoon/>}/>
      <Route path="/minting" element={<Minting countdownTimestampMs={1644098400000}/>}/>
    </Routes>
  );
}

export default App;
