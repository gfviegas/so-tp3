import React from 'react'

// Componentes
import Splash from '../components/splash/splash'
import SimulationHome from '../components/simulation/home'
import SimulationExpress from '../components/simulation/express'
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
    component: SimulationHome,
    header: () => <span> Home </span>,
    exact: true
  },
  {
    path: '/simulacao/:simulationId/express',
    component: SimulationExpress,
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
