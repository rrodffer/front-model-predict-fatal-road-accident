import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Predicao from "./pages/Predicao";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
          <Link to="/" className="text-xl font-bold">
            Acidentes de Trânsito
          </Link>
          <Link to="/predicao" className="text-lg">
            Fazer Predição
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predicao" element={<Predicao />} />
        </Routes>
      </div>
    </Router>
  );
}
