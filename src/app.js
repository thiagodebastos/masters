import Router from './router'
import styles from './styles/main.styl'
import app from 'ampersand-app'
import Me from './models/me'

// make app accessible from browser console
window.app = app

// entry point for app, this is the first thing that will be run when app opens
app.extend ({
  init () {
    this.me = new Me()
    this.router = new Router()
    this.router.history.start()
  }
})

app.init()
