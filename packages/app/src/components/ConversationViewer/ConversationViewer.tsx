import { Container, Title, Paper, Stack, Group, Avatar } from '@mantine/core'
import MessageBubble from '../MessageBubble/MessageBubble'
import { Conversation, Message } from '../../types/types'

export interface ConversationViewerProps {
  conversation: Conversation
}

const getPosition = (index: number) => (index % 2 === 0 ? 'right' : 'left')

const ConversationViewer = ({ conversation }: ConversationViewerProps) => {
  return (
    <Container size="sm">
      <Title order={2} ta="center" mb="xl">
        Conversation Viewer
      </Title>
      <Paper p="md" withBorder>
        <Stack gap="md">{conversation.messages.map(getMessage)}</Stack>
      </Paper>
    </Container>
  )
}

const getMessage = (message: Message, index: number) => {
  const position = getPosition(index)
  return (
    <Group key={message.id} justify={position} align="flex-start">
      {position === 'left' && (
        <Avatar name={message.agent.name} color="blue" radius="xl" />
      )}
      <MessageBubble message={message} position={position} />
      {position === 'right' && (
        <Avatar name={message.agent.name} color="green" radius="xl" />
      )}
    </Group>
  )
}

export default ConversationViewer
