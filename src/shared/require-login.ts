import arc, { HttpRequest, HttpResponse } from '@architect/functions'

export default async function requireLogin (req: HttpRequest): Promise<HttpResponse | undefined> {
  if (!req.session.person) {
    return {    
      statusCode: 302,
      headers: {
        location: '/login'
      }  
    }
  }
}
