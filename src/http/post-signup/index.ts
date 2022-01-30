import arc from '@architect/functions';
import create from './create-person';

const handler = arc.http.async(async function (req) {
  const person = await create(req.body.email, req.body.password);
  return {
    session: { person },
    statusCode: 303,
    headers: {
      location: '/notes',
    },
  };
});

export { handler };
