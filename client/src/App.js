import "./App.css";
import StoreListFuncComp from "./components/storeComponent";
import AddItemFuncComp from "./components/AddItemFuncComponent";
import UpdateItemFuncComp from "./components/UpdateItemFuncComp";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CoolComponent from './components/coolComponent';

function App() {
  return (
    <div
      className="App"
      draggable="false"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoreListFuncComp />} />
          <Route path="/add-item" element={<AddItemFuncComp />} />
          <Route path="/update/:id" element={<UpdateItemFuncComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
