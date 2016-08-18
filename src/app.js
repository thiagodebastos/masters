import Router from './router'


// entry point for app, this is the first thing that will be run when app opens
window.app = {
  init () {
    this.router = new Router()
    this.router.history.start()
  }
}

window.app.init()
