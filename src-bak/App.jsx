import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Settings';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import MyFavorite from './pages/MyFavorite';

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my_favorite" element={<MyFavorite />} />
              {/* Default route (redirect to Dashboard) */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
