import arc from '@architect/functions'
import bcrypt from 'bcrypt'

export default async function createPerson (email, suppliedPassword) {
  let SALT_ROUNDS = 12
  let hashedPassword = await bcrypt.hash(suppliedPassword, SALT_ROUNDS)
  let data = await arc.tables()
  
  return data.people.put({email, password: hashedPassword})
}
