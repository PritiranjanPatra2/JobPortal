import React from 'react'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import { useAppContext } from './contexts/AppContext'
import DashBoard from './components/DashBoard'
import AdminDashBoard from './components/AdminDashBoard'
import AddJob from './components/AddJob'
import ViewDetails from './components/ViewDetails'

function App() {
  const isAdminPath=useLocation().pathname.includes("admin");
  const {user,admin}=useAppContext();
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
     {!isAdminPath && <Navbar />}
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/admin-dashboard' element={admin ? <AdminDashBoard/> : <AdminLogin/>} />
     
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path='/add-job' element={<AddJob/>} />
      <Route path='/job/:id' element={<ViewDetails/>} />


     </Routes>
    </div>
  )
}

export default App