import arc from '@architect/functions';
import layout from '@architect/shared/layout';
import requireLogin from '@architect/shared/require-login';

// display a note
const handler = arc.http.async(requireLogin, async function (req) {
  const noteID = req.pathParameters.noteID;
  const email = req.session.person && req.session.person.email;
  const data = await arc.tables();
  const note = await data.notes.get({ noteID, email });

  const html = `
    <article>
      <h2>Edit note</h2>
      <form action=/notes/${noteID} method=post>
        <input type=hidden name=noteID value=${noteID}>
        <div class="input-and-label">
          <input 
          type=text 
          name=title 
          placeholder="Enter title" 
          value="${note.title}"
          required>
        </div>
        <div class="input-and-label">
          <textarea 
          class=form-control 
          name=body 
          placeholder="Enter text">${note.body}
          </textarea>
        </div>
        <button type=submit>Save changes</button>
      </form>

      <form action=/notes/${noteID}/delete method=post>
        <button class="danger" type=submit>Delete</button>
      </form>
    </article>
  `;

  return {
    html: layout({ contents: html }),
  };
});

export { handler };
