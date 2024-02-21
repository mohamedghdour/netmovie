import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Search from "./components/Search";
import Watch from "./components/Movie";

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path={`/watch/:type/:id`} element={<Watch />} />
        {/* Add more routes as needed */}
      </Routes>
  );
}

export default App;
