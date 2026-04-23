import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-card px-6 py-4 flex items-center justify-between'>
        <Link to="/" className='text-primary text-2xl font-bold'>
        cineInfo
        </Link>
        <div className='flex gap-6 text-sm'>
            <Link to="/" className='hover:text-primary transition-colors'>Home</Link>
            <Link to="/search" className='hover:text-primary transition-colors'>Search</Link>
            <Link to="/login" className='hover:text-primary transition-colors'>Login</Link>

        </div>
    </nav>
  )
}

export default Navbar
