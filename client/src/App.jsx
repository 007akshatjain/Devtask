import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;