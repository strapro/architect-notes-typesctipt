import arc, { HttpRequest } from '@architect/functions'
import layout from '@architect/shared/layout'

// show the login page
let handler = arc.http.async(async function(req) {
  let flash = req.session.attemptedEmail? `Could not log in as ${req.session.attemptedEmail}` : false

  let loggedInPage = `
    <body>
      <h2>You're already logged in!</h2>
        <p>
        <a href=/notes>notes</a>
        <a href=/logout>logout</a>
      </p>
    </body>`

  let notLoggedInPage = `
    <body class="signup-page dark">
      <form class="login" method="post" action=/login>
      
        <a href="/"><img class="logo" src=/_static/images/logo.svg></a>

        <h2>Please log in below!</h2>	

        <div class="flash-message ${flash? '' : 'no-messages'}">${flash || ''}</div>
    
        <div class="input-and-label">
          <input name="email" required="required" type="email" autocomplete="off" value="${req.session.attemptedEmail || ''}" placeholder="Email address" autofocus/>
          <label for="email">Email address</label>
        </div>
    
        <div class="input-and-label">
          <input name="password" required="required" type="password" autocomplete="off" placeholder="Password"/>
          <label for="password">Password</label>
        </div>
        
        <button type="submit">Log In</button>
    
      </form>

      <a href=/signup>Sign up</a>

    </body>
  `

  let contents = req.session.person ? loggedInPage : notLoggedInPage

  return {
    html: layout({ contents, showNav: false })
  }
})

export { handler }