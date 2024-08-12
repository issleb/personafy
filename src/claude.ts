import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { Message, MessageRole } from '@prisma/client'

interface CallParams {
  system: string
  messages: Message[]
  model: 'HAIKU' | 'SONNET' | 'OPUS'
}

export class ClaudeService {
  protected readonly client: Anthropic
  protected model: string

  public constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    this.model = mapModel('OPUS')
  }
  public async call({ system, messages }: CallParams) {
    const claudeMessages: MessageParam[] = messages.map((message) => ({
      role: message.role === MessageRole.USER ? 'user' : 'assistant',
      content: message.content,
    }))

    const msg = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system,
      messages: claudeMessages,
    })

    const content = msg.content[0]?.text
    if (!content) {
      throw new Error('No message content.')
    }

    return content
  }
}

const mapModel = (model: 'HAIKU' | 'SONNET' | 'OPUS') => {
  const modelMap = {
    OPUS: 'claude-3-opus-20240229',
    SONNET: 'claude-3-5-sonnet-20240620',
    HAIKU: 'claude-3-haiku-20240307',
  }

  return modelMap[model] || ''
}
