import React from 'react'
import Router from 'ampersand-router'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'
import styles from './styles/main.styl'

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
    'repos': 'repos'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage />)
  }
})
