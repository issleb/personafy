export interface Agent {
  id: string
  name: string
}

export interface Message {
  id: string
  timestamp: Date
  agent: Agent
  content: string

  isAgent: boolean
}

export interface Conversation {
  model: string
  messages: Message[]
}
