import app from 'ampersand-app'
import React from 'react'
import localLinks from 'local-links'

// NOTE: the purpose of this component is to prevent a page refresh when
// the user clicks on any links that can be resolved locally. Instead of
// refreshing the page, we use load the relevant component that is to be
// shown at that link. If the link clicked on is not a locally resolvable
// link, that is, a route to a component, then handle the link using default
// browser behaviour

export default React.createClass({
  displayName: 'NavHelper',

  // NOTE: on any click, check if the click is to an actual link tag that is local
  // and if so get a pathname that is not `null` and handle this internally
  // regarding the router, this works the same with browserHistory and pushState
  onClick (event) {
    // pathname will be either an internal link path or `null`
    const pathname = localLinks.getLocalPathname(event)

    // check if pathname is not null
    if (pathname) {
      event.preventDefault()
      // handle routing internally
      app.router.history.navigate(pathname)
    }
  },

  render () {
    return (
      // pass down any props that exist with ES6 spread operator
      <div {...this.props} onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  }
})
