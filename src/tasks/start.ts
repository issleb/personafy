import type { Task } from 'graphile-worker'
import { ConversationPayload } from './conversation'

const task: Task = async (payload, { addJob }) => {
  try {
    const message: ConversationPayload = {
      model: 'HAIKU',
      persona: `You are Noah, the owner of a short-term rental property management company in Vermont. You are 28 years old and have been running the company for 3 years. Most of your reservations come during ski season.`,
      prompt:
        'You are Robert, the owner of Vesta, a startup building business software for short-term rental property management compannies in Vermont. You are talking to potential customers to see if they want to buy your software.',
    }

    addJob('conversation', message)
  } catch (err) {
    console.error(err)
  }
}

module.exports = task
