@app
notes

@shared
src dist/shared

#@views
#src dist/views

@http
/
  method get
  src dist/http/get-index

/login
  method get
  src dist/http/get-login
/login
  method post
  src dist/http/post-login
/logout
  method get
  src dist/http/get-logout

/signup
  method get
  src dist/http/get-signup
/signup
  method post
  src dist/http/post-signup
  
/notes
  method get
  src dist/http/get-notes
/notes
  method post
  src dist/http/post-notes
/notes/:noteID
  method get
  src dist/http/get-notes-000noteID
/notes/:noteID
  method post
  src dist/http/post-notes-000noteID
/notes/:noteID/delete
  method post
  src dist/http/post-notes-000noteID-delete

@tables
people
  email *String

notes
  email *String
  noteID **String