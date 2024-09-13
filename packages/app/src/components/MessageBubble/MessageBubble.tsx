import { Paper, Text } from '@mantine/core'
import { DateTime } from 'luxon'
import { Message } from '../../types/types'

export interface MessageBubbleProps {
  message: Message
  isAgent: boolean
}

const MessageBubble = ({ message, isAgent }: MessageBubbleProps) => (
  <Paper
    p="md"
    withBorder
    radius="md"
    style={{
      maxWidth: '70%',
      alignSelf: isAgent ? 'flex-start' : 'flex-end',
      backgroundColor: isAgent ? '#f1f3f5' : '#228be6',
      color: isAgent ? 'inherit' : 'white',
    }}
  >
    <Text size="sm">{message.content}</Text>
    <Text
      size="xs"
      c={isAgent ? 'dimmed' : 'rgba(255, 255, 255, 0.7)'}
      ta="right"
      mt={5}
    >
      {DateTime.fromISO(message.timestamp).toFormat('cccc, LLL dd hh:mm a')}
    </Text>
  </Paper>
)

export default MessageBubble
