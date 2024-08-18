import type { Task } from 'graphile-worker'

import { Persona } from '@prisma/client'
import { prisma } from '../db'
import { AgentService } from '../agent'

const task: Task = async (payload) => {
  try {
    console.log('Starting conversation')

    const { personaIds, iterations } = payload as ConversationPayload

    const personas = await Promise.all([
      prisma.persona.findUniqueOrThrow({ where: { id: personaIds[0] } }),
      prisma.persona.findUniqueOrThrow({ where: { id: personaIds[1] } }),
    ])

    const conversation = await prisma.conversation.create({
      data: {},
    })
    const agents = await getAgents(conversation.id, personas)

    let message = await talk(agents, 'BEGIN')

    let count = 0
    do {
      message = await talk(agents, message)

      count++
    } while (count < iterations)
  } catch (err) {
    console.error(err)
  }
}

module.exports = task

export interface ConversationPayload {
  personaIds: [string, string]
  iterations: number
}

const getAgents = async (
  conversationId: string,
  personas: Persona[]
): Promise<[AgentService, AgentService]> => {
  const agents = personas.map(
    ({ name, context, id }) =>
      new AgentService({
        conversationId,
        name,
        context,
        personas: personas.filter((p) => p.id !== id).map((p) => p.intro),
      })
  )
  if (!agents[0] || !agents[1]) {
    throw new Error('This should never happen.')
  }

  await Promise.all(agents.map((agent) => agent.create(conversationId)))

  return [agents[0], agents[1]]
}

const talk = async (agents: [AgentService, AgentService], message: string) => {
  const newMessage = await agents[0].call(message)
  const response = await agents[1].call(newMessage)

  console.log(`Agent 0: ${newMessage}`)
  console.log(`Agent 1: ${response}`)
  return response
}
