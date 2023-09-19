import { useAuth } from '../hooks'

export const WithAuth = ({ children }: { children: React.ReactNode }) => {
  useAuth()
  return <>{children}</>
}
