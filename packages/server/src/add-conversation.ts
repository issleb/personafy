import { quickAddJob } from 'graphile-worker'
import { ConversationPayload } from './tasks/conversation'

async function main() {
  try {
    const message: ConversationPayload = {
      personaIds: ['1', '2'],
      iterations: 5,
    }

    await quickAddJob({}, 'conversation', message)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main().catch((error: Error) => {
  console.error(error)
  process.exit(1)
})
