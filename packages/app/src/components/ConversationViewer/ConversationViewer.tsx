import { Container, Title, Paper, Stack, Group, Avatar } from '@mantine/core'
import MessageBubble from '../MessageBubble/MessageBubble'
import { Conversation } from '../../types/types'

export interface ConversationViewerProps {
  conversation: Conversation
}

const ConversationViewer = ({ conversation }: ConversationViewerProps) => {
  return (
    <Container size="sm">
      <Title order={2} ta="center" mb="xl">
        Conversation Viewer
      </Title>
      <Paper p="md" withBorder>
        <Stack gap="md">
          {conversation.messages.map((message) => (
            <Group
              key={message.id}
              justify={message.isAgent ? 'left' : 'right'}
              align="flex-start"
            >
              {message.isAgent && (
                <Avatar name={message.agent.name} color="blue" radius="xl" />
              )}
              <MessageBubble message={message} isAgent={message.isAgent} />
              {!message.isAgent && (
                <Avatar
                  name={message.agent.name}
                  color="green"
                  radius="xl"
                ></Avatar>
              )}
            </Group>
          ))}
        </Stack>
      </Paper>
    </Container>
  )
}

export default ConversationViewer
