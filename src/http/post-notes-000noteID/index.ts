import arc from '@architect/functions'
import requireLogin from '@architect/shared/require-login'

let handler = arc.http.async(requireLogin, async function(req) {

  // get the note (including title, body and noteID) from the form post
  let note = req.body
  note.email = req.session.person.email

  // save the updated note
  let data = await arc.tables() 
  await data.notes.put(note)

  return {
    statusCode: 303,
    headers: {
      location: '/notes'
    }
  }
})

export { handler }