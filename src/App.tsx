import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { Quiz } from './pages/Quiz';
import { Tools } from './pages/Tools';
import { Progress } from './pages/Progress';
import { Reference } from './pages/Reference';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0d1f13]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/learn" element={<Dashboard />} />
          <Route path="/learn/:moduleId" element={<Lesson />} />
          <Route path="/quiz/:moduleId" element={<Quiz />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/reference" element={<Reference />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
