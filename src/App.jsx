// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './components/PrivateRouts'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element = {<RegisterPage/>}/>

          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Room/>}/>
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
