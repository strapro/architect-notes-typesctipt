import arc, { HttpRequest } from '@architect/functions'
import requireLogin from '@architect/shared/require-login'
import save from './save'

let handler = arc.http.async(requireLogin, async function (req: HttpRequest) {

  // create the partition and sort keys
  let email = req.session.person.email
  let title = req.body.title
  let body = req.body.body

  // save the note
  await save({email, title, body})

  return {
    statusCode: 303,
    headers:{
      location: '/notes'
    }
  }
});

export { handler }