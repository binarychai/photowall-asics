import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import AddImage from './component/AddImage';
import './App.css';
function App() {
  return (
     <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="addImage" element={<AddImage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
   
  );
}

export default App;
