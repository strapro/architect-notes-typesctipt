import arc from '@architect/functions'
import requireLogin from '@architect/shared/require-login'

let handler = arc.http.async(requireLogin, async function(req) {
  let data = await arc.tables()
  await data.notes.delete({
    noteID: req.pathParameters.noteID,
    email: req.session.person.email
  })
  return {
    statusCode: 303,
    headers: {
      location: '/notes'
    }
  }
})

export { handler }