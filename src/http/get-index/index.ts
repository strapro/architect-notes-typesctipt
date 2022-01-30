import arc from '@architect/functions';
import layout from '@architect/shared/layout';
import { Client } from 'pg';

const handler = arc.http.async(async function (request) {
  const client = new Client();

  await client.connect();
  const res = await client.query('SELECT * FROM test');
  await client.end();

  const state = await arc.http.session.read(request);
  const email = state.person && state.person.email;

  const isLoggedIn = !!state.person;

  const loggedInPage = `
    <section class="hero">
      <h1>Welcome back <strong>${email}</strong>!</h1>	
      <h2>You've logged in. That's so cool.</p>
      <p>Check your <a href=/notes>notes</a> or <a href=/logout>logout</a></p>   
    </hero>
  `;

  const notLoggedInPage = `
    <section class="hero">
      <h1>Welcome to the Architect demo app!</h1>	
      <h2>It looks like it's your first time here. You should <a href=/signup>sign up</a> now!</p>
      <p>You can also try and visit <a href=/notes>Notes</a> or <a href=/login>Log in</a> but you'll need to sign up first.</a></p>   
      ${JSON.stringify(res)}
    </hero>
  `;
  const contents = isLoggedIn ? loggedInPage : notLoggedInPage;

  return {
    html: layout({ contents, isLoggedIn }),
  };
});

export { handler };
