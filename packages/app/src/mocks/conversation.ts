import { Conversation } from '../types/types'

export const sampleConversation: Conversation = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      id: 'msg1',
      timestamp: '2024-08-28T10:00:00Z',
      agent: {
        id: 'user1',
        name: 'User',
      },
      content: 'Hello! Can you help me with a coding problem?',
    },
    {
      id: 'msg2',
      timestamp: '2024-08-28T10:01:00Z',
      agent: {
        id: 'agent1',
        name: 'Code Helper',
      },
      content:
        "Of course! I'd be happy to help. What's the coding problem you're facing?",
    },
    {
      id: 'msg3',
      timestamp: '2024-08-28T10:02:00Z',
      agent: {
        id: 'user1',
        name: 'User',
      },
      content:
        "I'm having trouble with a React component. It's not rendering properly.",
    },
    {
      id: 'msg4',
      timestamp: '2024-08-28T10:03:00Z',
      agent: {
        id: 'agent1',
        name: 'Code Helper',
      },
      content:
        'I see. Can you share the component code? That will help me identify the issue and provide a solution.',
    },
  ],
}

export default sampleConversation
