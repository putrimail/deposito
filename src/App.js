import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SlotMachine from './components/SlotMachine';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SlotMachine />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

