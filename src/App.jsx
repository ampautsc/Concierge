import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

function AppContent() {
  return (
    <div className="app-container">
      <Login />
    </div>
  )
}

export default App
