import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar';
import Players from './components/Players';

function App() {
  return (
    <Router>
      <Sidebar/>
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/players" element={<Players />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  </Router>
  );
}

export default App;
