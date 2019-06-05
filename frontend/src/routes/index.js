import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

// Componentes
import Home from '../components/home/home'
import Test from '../components/test/test'
import Notfound from '../components/404'

function RouteWithSubRoutes (route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/teste',
    component: Test
  },
  {
    component: Notfound
  }
]

const routing = (
  <Router>
    <div>
      <ul>
        <li> <Link to='/'> Home </Link> </li>
        <li> <Link to='/teste'> Teste </Link> </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  </Router>
)

export { routes, routing, RouteWithSubRoutes }
