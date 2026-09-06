// portfolio activity
import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router-dom';
import { ProjectPage } from './pages/ProjectPages';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log("Welcome to Patrick's Porfolio dev environment!");
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />

        <Route path="/secret"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="py-20 text-center">
                <h1 className="text-3xl font-bold text-emerald-400">🔒 Secret Page (Members Only!)</h1>
                <p className="text-zinc-400 mt-2">If you can see this, you are logged in!</p>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold text-rose-400">Access Denied! 🚫</h1>
              <p className="text-zinc-400 mt-2">Please log in using the button in the navbar.</p>
            </div>
          }
        />
      </Routes >
      <Footer />
    </>
  )
}

export default App
