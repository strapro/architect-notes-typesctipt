import arc from '@architect/functions';
import verify from './verify-password';

const handler = arc.http.async(async function (req) {
  const session: { attemptedEmail?: string; person?: { email: string } } = {};
  const person = await verify(req.body.email, req.body.password);

  if (!person) {
    session.attemptedEmail = req.body.email;
  } else {
    session.person = person;
  }

  return {
    session,
    statusCode: 303,
    headers: {
      location: person ? '/notes' : '/login',
    },
  };
});

export { handler };
