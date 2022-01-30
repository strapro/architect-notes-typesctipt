import arc, { HttpRequest } from '@architect/functions';
import requireLogin from '@architect/shared/require-login';
import save from './save';

const handler = arc.http.async(requireLogin, async function (req: HttpRequest) {
  // create the partition and sort keys
  const email = req.session.person.email;
  const title = req.body.title;
  const body = req.body.body;

  // save the note
  await save({ email, title, body });

  return {
    statusCode: 303,
    headers: {
      location: '/notes',
    },
  };
});

export { handler };
