export interface Agent {
  id: string
  name: string
}

export interface Message {
  id: string
  timestamp: string
  agent: Agent
  content: string

  isAgent: boolean
}

export interface Conversation {
  model: string
  messages: Message[]
}
