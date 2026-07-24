import {  Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/analyze" element={<Analyze />} />

      <Route path="/results/:analysisId" element={<Results />} />
    </Routes>
  );
}

export default App;
