import React from 'react'

export default class PublicPage extends React.Component {
  render () {
    return (
      <div>
        <div className='container'>
          <header role='banner'>
            <h1>Labelr</h1>
          </header>
          <div>
            <p>We label stuff for you, because, we can&trade;</p>
            <a href='/login' className='button button-large'>
              <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
            </a>
          </div>
        </div>
      </div>
    )
  }
}

