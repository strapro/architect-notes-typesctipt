import arc from '@architect/functions'
import Hashids from 'hashids'

let hashids = new Hashids()

export default async function save ({email, title, body}) {
  let data = await arc.tables()
  return data.notes.put({
    email,
    title,
    body,
    noteID: hashids.encode(Date.now())
  })
}
