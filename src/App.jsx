import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import WelcomeScreen from './components/WelcomeScreen'
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
      <WelcomeScreen />
    </div>
  )
}

export default App
