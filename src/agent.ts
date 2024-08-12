import { Message, MessageRole } from '@prisma/client'
import { ClaudeService } from 'claude'
import { prisma } from 'db'

interface AgentParams {
  conversationId: string
  name: string
  context: string
  personas: string[]
}

export class AgentService {
  private readonly claudeService: ClaudeService
  private readonly conversationId: string
  private readonly name: string
  private readonly system: string

  private readonly messages: Message[] = []

  private id: string | null = null

  public constructor({ conversationId, name, context, personas }: AgentParams) {
    this.claudeService = new ClaudeService()
    this.conversationId = conversationId
    this.name = name
    this.system = context

    for (const persona of personas) {
      this.system += ` ${persona}`
    }
  }

  public async create(conversationId: string) {
    if (this.id) {
      return
    }

    const agent = await prisma.agent.create({
      data: {
        conversationId,
        name: this.name,
        context: this.system,
      },
    })
    this.id = agent.id
  }

  public async call(message: string) {
    await this.addMessage('USER', message)

    const response = await this.claudeService.call({
      model: 'OPUS',
      system: this.system,
      messages: this.messages,
    })

    await this.addMessage('AGENT', response)

    return response
  }

  private async addMessage(role: MessageRole, content: string) {
    const message = await prisma.message.create({
      data: {
        agentId: this.id,
        role,
        content,
      },
    })

    this.messages.push(message)

    return message
  }
}
