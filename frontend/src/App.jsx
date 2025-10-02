import React from 'react'
import './App.css'
import VideoPage from './pages/VideoPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/video' element={<VideoPage />} />
        
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
