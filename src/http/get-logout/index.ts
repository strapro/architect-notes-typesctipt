import arc, { HttpResponse } from '@architect/functions'

// logout clears the session and redirects home
let handler = arc.http.async(async function() {  
  return {
    session: {},    
    statusCode: 302,
    headers: {
      location: '/'
    }         
  }
})

export { handler }