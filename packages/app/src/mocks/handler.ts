import { http, HttpResponse } from 'msw'
import { sampleConversation } from './conversation'

export const handlers = [
  http.get('/api/conversation', () => {
    return HttpResponse.json(sampleConversation)
  }),
]
