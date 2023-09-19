import { Alert } from 'react-bootstrap'

type MessageProps = {
  children: React.ReactNode
  variant: string
}
const Message = ({ variant = 'info', children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message
