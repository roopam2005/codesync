import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import EditorPage from './pages/EditorPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base text-white font-vt overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#12121a',
              color: '#fff',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              fontFamily: 'VT323, monospace',
              fontSize: '18px',
            },
            success: {
              iconTheme: { primary: '#06b6d4' },
            },
            error: {
              iconTheme: { primary: '#ef4444' },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;