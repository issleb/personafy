import Anthropic from '@anthropic-ai/sdk'
import { ClaudeService } from 'claude'
import type { Task } from 'graphile-worker'
import { prisma } from 'db'
import { Message, MessageRole } from '@prisma/client'

const task: Task = async (payload, {}) => {
  try {
    const { personaId, promptId } = payload as ConversationPayload

    const persona = await prisma.persona.findUnique({
      where: { id: personaId },
    })
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    })
    if (!persona || !prompt) {
      throw new Error('Persona or prompt not found')
    }

    const claude = new ClaudeService()

    const messages: ConversationMessage[] = [
      {
        role: 'RESPONDENT',
        content: persona.intro,
      },
    ]

    let role: MessageRole = MessageRole.CALLER
    let count = 1
    do {
      const system =
        role === MessageRole.CALLER ? prompt.context : persona.context

      const newMessage = await claude.call({
        role,
        model: 'OPUS',
        system,
        messages,
      })

      const content = newMessage.content[0]?.text
      if (!content) {
        throw new Error('No message content')
      }
      console.log(`${role}: "${content}"`)

      messages.push({
        role,
        content,
      })

      if (role === MessageRole.CALLER) {
        role = MessageRole.RESPONDENT
      } else {
        role = MessageRole.CALLER
        count++
      }
    } while (count < 5)

    await prisma.conversation.create({
      data: {
        personaId: persona.id,
        promptId: prompt.id,
        messages: {
          create: messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        },
      },
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = task

export type ConversationPayload = {
  personaId: string
  promptId: string
}

export type ConversationMessage = {
  content: string
  role: MessageRole
}
