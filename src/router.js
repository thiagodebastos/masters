import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'

/*
 * NOTES:
 * - history stored in a single history object
 *
*/

export default Router.extend({
  // all pages, unless specified, will be rendered within the Layout component
  renderPage (page, options = {layout: true}) {
    if (options.layout) {
      page = (
        <Layout>
          {page}
        </Layout>
      )
    }

    React.render(page, document.body)
  },
  // empty string means root dir
  // when in root dir, run `public()`
  routes: {
    '': 'public',
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query': 'authCallback'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage />)
  },

  // window.location.origin is the current url and port, so that we don't have
  // to change this again in production
  // we only expose client_id which is public. Nowhere in our app do we expose
  // the client_secret. This is only used in the heroku gatekeeper app.
  // no one else can use this as the only way to get to get to this url is to
  // be redirected by github during authentication, which will send our query.code
  // with it, and use it to authenticate with gatekeeper
  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: '46a8eb4d5fcb0ff2abae',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
  },

  authCallback (query) {
    query = qs.parse(query)
    console.log(query)
    // xhr follows same api pattern as request. We use this to save on code
    // url: send query.code to a heroku app using https://github.com/prose/gatekeeper
    // we use heroku because in this instance, we are not using a node server ourselves,
    // we are only serving a static app.
    // json: true will automatically parse json and return an object
    // the fat arrow function will bind `this` to parent's context, in this
    // case the router
    // Once the user is logged in, route to '/repos' page
    xhr({
      url: 'https://dry-waters-22640.herokuapp.com/authenticate/' + query.code,
      json: true
      }, (err, req, body) => {
        console.log(body)
        app.me.token = body.token
        this.redirectTo('/repos')
      })
  },

  // to log out we clear the localStorage containing private information and
  // reroute back to the homepage
  // NOTE: the user will still be logged in to Github
  logout () {
    window.localStorage.clear()
    window.location = '/'
  }

})
