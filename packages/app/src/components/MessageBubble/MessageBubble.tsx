import { Paper, Text } from '@mantine/core'
import { DateTime } from 'luxon'
import { Message } from '../../types/types'

export interface MessageBubbleProps {
  message: Message
  position: 'left' | 'right'
}

const MessageBubble = ({ message, position }: MessageBubbleProps) => (
  <Paper
    p="md"
    withBorder
    radius="md"
    style={{
      maxWidth: '70%',
      backgroundColor: position === 'left' ? '#f1f3f5' : '#228be6',
      color: position === 'left' ? 'inherit' : 'white',
    }}
  >
    <Text size="sm" ta={position}>
      {message.content}
    </Text>
    <Text
      size="xs"
      c={position === 'left' ? 'dimmed' : 'rgba(255, 255, 255, 0.7)'}
      ta="right"
      mt={5}
    >
      {DateTime.fromISO(message.timestamp).toFormat('cccc, LLL dd hh:mm a')}
    </Text>
  </Paper>
)

export default MessageBubble
