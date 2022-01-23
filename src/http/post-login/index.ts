import arc from '@architect/functions'
import verify from './verify-password'

let handler = arc.http.async(async function(req) {

  let session: {attemptedEmail?: string, person?: {email: string}} = {}
  let person = await verify(req.body.email, req.body.password)
  
  if (!person) {
    session.attemptedEmail = req.body.email
  }
  else {
    session.person = person
  }

  return {
    session,
    statusCode: 303,
    headers: {
      location: person? '/notes' : '/login'    
    }
  }
})

export { handler }