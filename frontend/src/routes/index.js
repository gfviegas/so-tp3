import React from 'react'

// Componentes
import Splash from '../components/splash/splash'
import Home from '../components/home/home'
import Test from '../components/test/test'
import Notfound from '../components/404'

const routes = [
  {
    path: '/',
    component: Splash,
    exact: true
  },
  {
    path: '/simulacao/:simulationId',
    component: Home,
    header: () => <span> Home </span>,
    exact: true
  },
  {
    path: '/teste',
    header: () => <span> Teste </span>,
    component: Test
  },
  {
    component: Notfound
  }
]

export { routes }
