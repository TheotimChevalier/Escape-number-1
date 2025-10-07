import React, { useState, useRef } from "react";
import "./styles/App.css";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <main>
      <Outlet/>
    </main>
  );
}

export default App;
