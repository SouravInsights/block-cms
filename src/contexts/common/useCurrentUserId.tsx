import { useUser } from './UserProvider'

export function useCurrentUserId(): [string | null, boolean] {
  const { publicKey, loading } = useUser()
  return [publicKey ?? null, loading]
}