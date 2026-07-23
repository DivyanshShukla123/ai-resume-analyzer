import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";


function App() {
  return (
    <BrowserRouter>
      Navbar()
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/analyze" element={<Analyze />} />

        <Route path="/results/:analysisId" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
