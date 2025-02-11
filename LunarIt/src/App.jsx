import React, { createContext, useContext, useState } from "react";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter } from "react-router-dom";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </>
  );
};

export default App;
