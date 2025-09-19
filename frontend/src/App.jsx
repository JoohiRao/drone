import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import UserPage from "./pages/UserPage";
function App() {
  return (

    <Router>
      <Routes>
         <Route path="/" element={<HomePage />} />  
         {/*this is main landing page */}

        <Route path="/admin/login" element={<AdminLogin />} />
        {/* for admin login */}

         <Route path="/admin/signup" element={<AdminSignup />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* for admin dashboard ke liye */}
        
        <Route path="/user" element={<UserPage />} />
        {/* for user without login kre */}
      </Routes>
    </Router>
   
  )
}

export default App
