import React, { useEffect, useState } from 'react'
import { Conversation } from './types/types'
import { createTheme, MantineProvider } from '@mantine/core'
import ConversationViewer from './components/ConversationViewer/ConversationViewer'

const theme = createTheme({
  /** Put your mantine theme override here */
})

function App() {
  const [conversation, setConversation] = useState<Conversation | null>(null)

  console.log('yo')

  useEffect(() => {
    fetch('/api/conversation')
      .then((response) => response.json())
      .then((data) => setConversation(data))
      .catch((error) => console.error('Error fetching conversation:', error))
  }, [])

  if (!conversation) return <div>Loading...</div>

  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <ConversationViewer conversation={conversation} />
      </div>
    </MantineProvider>
  )
}

export default App
