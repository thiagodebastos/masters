import Router from 'ampersand-router'

// history stored in a single history object
export default Router.extend({
  // empty string means root dir
  // when in root dir, run `public()`
  routes: {
    '': 'public',
    'repos': 'repos'
  },

  public () {
    console.log('public page')
  },

  repos () {
    console.log('repos')
  }
})
