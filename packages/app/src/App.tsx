import { useEffect, useState } from 'react'
import './App.css'
import { MantineProvider } from '@mantine/core'
import { Conversation } from './types/types'
import ConversationViewer from './components/ConversationViewer/ConversationViewer'
import '@mantine/core/styles.css'

function App() {
  const [conversation, setConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    fetch('/api/conversation')
      .then((response) => response.json())
      .then((data) => setConversation(data))
      .catch((error) => console.error('Error fetching conversation:', error))
  }, [])

  if (!conversation) return <div>Loading...</div>

  return (
    <MantineProvider>
      <ConversationViewer conversation={conversation} />
    </MantineProvider>
  )
}

export default App
