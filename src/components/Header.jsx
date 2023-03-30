import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {icon} from '../index'

export default function Header() {

  const activeLink = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616'
  }

  return (
    <header>
        <Link className='site-logo' to='/'>#VANLIFE</Link>
        <nav>
          <NavLink to='host'
          style={({isActive}) => isActive ? activeLink : null}>Host</NavLink>

          <NavLink to='about'
          style={({isActive}) => isActive ? activeLink : null}>About</NavLink>

          <NavLink to='vans'
          style={({isActive}) => isActive ? activeLink : null}>Vans</NavLink>

          <Link to='login' className='login-link'>
            <img src={icon} className='login-icon'/>
          </Link>
        </nav>
    </header>
  )
}
