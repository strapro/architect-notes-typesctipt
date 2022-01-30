import arc from '@architect/functions';

// logout clears the session and redirects home
const handler = arc.http.async(async function () {
  return {
    session: {},
    statusCode: 302,
    headers: {
      location: '/',
    },
  };
});

export { handler };
