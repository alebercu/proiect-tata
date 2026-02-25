import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import AdminUpload from './pages/AdminUpload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar-ul care va apărea pe TOATE paginile */}
        <nav className="bg-white shadow-sm border-b py-4 px-6 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 tracking-tighter uppercase">
              Ioan Bercu
            </Link>
            <div className="flex gap-8 font-medium text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition">Acasă</Link>
              <Link to="/galerie" className="hover:text-blue-600 transition">Galerie</Link>
            </div>
          </div>
        </nav>

        {/* Locul unde se schimbă conținutul paginilor */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/admin-panou-control" element={<AdminUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;