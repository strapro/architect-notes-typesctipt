import arc from '@architect/functions';
import bcrypt from 'bcrypt';

export default async function createPerson(email, suppliedPassword) {
  const SALT_ROUNDS = 12;
  const hashedPassword = await bcrypt.hash(suppliedPassword, SALT_ROUNDS);
  const data = await arc.tables();

  return data.people.put({ email, password: hashedPassword });
}
