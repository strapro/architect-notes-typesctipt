@app
notes

@jwt
issuer https://cognito-idp.us-west-2.amazonaws.com/us-west-2_5ENiX07Dz
audience 2q96v3f39m0ep85ega1qhun1mr #Audience in the JWT
identitySource $request.header.Authorization

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

@macros
jwt-cognito

@tables
people
  email *String

notes
  email *String
  noteID **String