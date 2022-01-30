import arc from '@architect/functions';
import bcrypt from 'bcrypt';

export default async function authenticatePerson(email, suppliedPassword) {
  const data = await arc.tables();
  const result = await data.people.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  });
  if (result.Items.length) {
    const person = result.Items[0];
    const authorized = await bcrypt.compare(suppliedPassword, person.password);
    if (authorized) {
      // Remove the hashed password, as we don't want it in sessions (or anywhere else outside this module)
      delete person.password;
      return person;
    }
  }
}
