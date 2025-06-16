// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import About from './pages/About';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <nav className="bg-indigo-700 text-white p-4 flex justify-between">
        <h2 className="font-bold">Health Risk Predictor</h2>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/predict" className="hover:underline">Predict</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/analytics" className="hover:underline">Analytics</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
