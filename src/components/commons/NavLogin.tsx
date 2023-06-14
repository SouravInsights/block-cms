import {
  Button,
} from '@chakra-ui/react'
import { useIsAuthenticated } from '@polybase/react'
import { useUser } from '../../contexts/common/UserProvider'

export const NavLogin = () => {
  const { signIn, signOut } = useUser()
  const [isLoggedIn, isLoggedInLoading] = useIsAuthenticated()

  if (isLoggedInLoading) return null

  if (!isLoggedIn) {
    return <Button width='100%' onClick={() => signIn()}>Login</Button>
  }

  return (
    <Button width='100%' onClick={() => signOut()}>
      Logout
    </Button>
  )
}