import type { Task } from 'graphile-worker'
import { ConversationPayload } from './conversation'

const task: Task = async (payload, { addJob }) => {
  try {
    const message: ConversationPayload = {
      personaId: '1',
      promptId: '1',
    }

    addJob('conversation', message)
  } catch (err) {
    console.error(err)
  }
}

module.exports = task
