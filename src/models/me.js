import Model from 'ampersand-model'

export default Model.extend({
  // initialize will run once if defined.
  // account for 2 possibilities. 1: we already have a token, 2: we don't yet have a token.
  // also need to account for when/if a token changes
  initialize () {
    this.token = window.localStorage.token
    this.on('change:token', this.onTokenChange)
  },

  // props are things we expect to receive from the server and persist back to ther server
  props: {
    id: 'number',
    login: 'string',
    avatar_url: 'string'
  },

  // session are things we want to keep just in the browser
  session: {
    token: 'string'
  },

  onTokenChange () {
    window.localStorage.token = this.token
  }
})
