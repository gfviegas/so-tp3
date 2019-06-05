import React from 'react'

// Assets
import logo from '../../assets/images/logo.svg'
import './home.sass'

function Home () {
  return (
    <div className='app'>
      <header className='app-header'>
        <img src={logo} className='app-logo' alt='logo' />
        <p> Edit <code>src/App.js</code> and save to reload. </p>
        <a className='app-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'> Learn React </a>
      </header>
    </div>
  )
}

export default Home
