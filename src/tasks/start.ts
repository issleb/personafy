import type { Task } from 'graphile-worker'
import { ConversationPayload } from './conversation'

const task: Task = async (_payload, { addJob }) => {
  try {
    const message: ConversationPayload = {
      personaIds: ['1', '2'],
      iterations: 5,
    }

    await addJob('conversation', message)
  } catch (err) {
    console.error(err)
  }
}

module.exports = task
