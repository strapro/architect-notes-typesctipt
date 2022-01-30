import arc from '@architect/functions';

export default async function getNotes(email) {
  const data = await arc.tables();
  const result = await data.notes.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  });
  return result.Items;
}
