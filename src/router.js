import React from 'react'
import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import styles from './styles/styles.styl'

// history stored in a single history object
export default Router.extend({
  // empty string means root dir
  // when in root dir, run `public()`
  routes: {
    '': 'public',
    'repos': 'repos'
  },

  public () {
    React.render(<PublicPage style={styles} />, document.body)
  },

  repos () {
    React.render(<ReposPage />, document.body)
  }
})
