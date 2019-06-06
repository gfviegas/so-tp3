import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { routes } from '../routes'

function RouteWithSubRoutes (route) {
  return (
    <Route
      key={route.path}
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

class Layout extends React.Component {
  render () {
    return (
      <Router>
        <div>

          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Layout
