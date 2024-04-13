import Anthropic from '@anthropic-ai/sdk'
import { ClaudeService } from 'claude'
import type { Task } from 'graphile-worker'
import { prisma } from 'db'
import { Message, MessageRole } from '@prisma/client'

const task: Task = async (payload, {}) => {
  try {
    const { model, persona, prompt } = payload as ConversationPayload

    const claude = new ClaudeService()
    const firstMessage = `You are talking to an owner of a short-term rental property management company in Vermont named Noah. He is 28 years old and has been running the company for 3 years. Most of his reservations come during ski season. Begin the conversation now.`

    const messages: ConversationMessage[] = [
      {
        role: 'RESPONDENT',
        content: firstMessage,
      },
    ]

    let role: MessageRole = MessageRole.CALLER
    let count = 1
    do {
      const system = role === MessageRole.CALLER ? prompt : persona

      const newMessage = await claude.call({
        role,
        model: 'HAIKU',
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
  } catch (err) {
    console.error(err)
  }
}

module.exports = task

export type ConversationPayload = {
  model: string
  persona: string
  prompt: string
}

export type ConversationMessage = {
  content: string
  role: MessageRole
}
