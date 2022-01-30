import arc from '@architect/functions';
import layout from '@architect/shared/layout';

const handler = arc.http.async(async function (req) {
  // You're already logged in
  if (req.session.person) {
    return {
      statusCode: 303,
      headers: {
        location: '/notes',
      },
    };
  }

  const signupPage = `
    <body class="signup-page dark">
      <form class="signup" method="post" action=/signup>
      
        <a href="/"><img class="logo" src=/_static/images/logo.svg /></a>
        <h2>Sign up</h2>
        
        <p>Enter an email and password to sign up</p>
    
        <div class="input-and-label">
          <input name="email" required="required" type="email" autocomplete="off" value="" placeholder="Email address" autofocus/>
          <label for="email">Email address</label>
        </div>
    
        <div class="input-and-label">
          <input name="password" required="required" type="password" autocomplete="off" placeholder="Password"/>
          <label for="password">Password</label>
        </div>

        <div class="input-and-label checkbox">
          <input type="checkbox" required checked>
          <label for=tsandcs>Agree to the terms of conditions</label> 
        </div>

        <button type="submit">Sign up</button>
    
      </form>

      <a href=/login>Log in</a>
    </body>
  `;

  return {
    html: layout({ contents: signupPage, showNav: false }),
  };
});

export { handler };
