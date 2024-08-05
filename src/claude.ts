import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { MessageRole } from '@prisma/client'
import { ConversationMessage } from 'tasks/conversation'

type CallParams = {
  role: MessageRole
  system: string
  messages: ConversationMessage[]
  model: 'HAIKU' | 'SONNET' | 'OPUS'
}

export class ClaudeService {
  protected readonly client: Anthropic
  public constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  public async call({ role, model, system, messages }: CallParams) {
    const claudeMessages: MessageParam[] = messages.map((message) => ({
      role:
        role === 'CALLER'
          ? message.role === 'CALLER'
            ? 'assistant'
            : 'user'
          : message.role === 'CALLER'
            ? 'user'
            : 'assistant',
      content: message.content,
    }))
    if (role === 'RESPONDENT') {
      claudeMessages.shift()
    }

    //console.log(role, claudeMessages)

    const msg = await this.client.messages.create({
      model: mapModel(model),
      max_tokens: 1024,
      system,
      messages: claudeMessages,
    })

    return msg
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
