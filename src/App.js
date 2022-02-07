import React from "react";
import { Route, Routes } from "react-router";

// import logo from './logo.svg';
// import './App.css';
import Home from "./screens/index"
import ComingSoon from "./screens/ComingSoon/ComingSoon";
import NftMinting from "./screens/NftMinting/NftMinting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/nft-market" element={<ComingSoon/>}/>
      <Route path="/minting" element={<NftMinting/>}/>
    </Routes>
  );
}

export default App;
