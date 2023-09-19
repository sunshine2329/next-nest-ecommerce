import { useShipping } from '../hooks'

export const WithShipping = ({ children }: { children: React.ReactNode }) => {
  useShipping()
  return <>{children}</>
}
