'use client'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Toast from '@/components/Toast'
import Landing from '@/components/pages/Landing'
import Signup from '@/components/pages/Signup'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
