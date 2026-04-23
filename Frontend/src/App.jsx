
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import ActorDetailsPage from './pages/ActorDetailsPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div className='min-h-screen  text-white'>
      <Navbar/>
      <main className='container mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/actors/:id' element={<ActorDetailsPage/>}/>
          <Route path='/movies/:id' element={<MovieDetailsPage/>}/>
          
        </Routes>
      </main>
    
    </div>
  )
}

export default App
