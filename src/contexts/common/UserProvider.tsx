import React, { useEffect, createContext, useCallback, useMemo, useContext } from 'react'
import Cookies from 'js-cookie'
import { usePolybase, useAuth } from '@polybase/react'
import { useRouter } from 'next/navigation'
import { schemas } from '@/schema/polybase'

export interface User {
  id: string
  enkey: string
}

export interface UserContextValue {
  publicKey: string | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const UserContext = createContext<UserContextValue>({
  publicKey: null,
  loading: true,
  signIn: async () => { throw new Error('Missing UserContext') },
  signOut: async () => { throw new Error('Missing UserContext') },
})

export interface UserProviderProps {
  children: React.ReactNode
  storagePrefix?: string
  domain?: string
}

export function UserProvider({ children, storagePrefix = 'polybase.', domain }: UserProviderProps) {
  const userPkPath = `${storagePrefix}publicKey`;
  const db = usePolybase();

  const { auth, state, loading } = useAuth()
  const router = useRouter()

  const signIn = useCallback(async () => {
    const authState = await auth.signIn()
    if (!authState) return

    const publicKey = authState.publicKey
    if (!publicKey) return

    const applySchemas = async () => {
      await db.applySchema(schemas);
    };

    applySchemas();

    const collectionReference = db.collection("users");
    const user = await collectionReference.record("id").get();

    console.log('user from provider:', user);

    // Create if new user
    if (!user) {
      await db.collection<User>('users').create([]).catch((e) => {
        console.error(e)
        throw e
      })
    }

    Cookies.set(userPkPath, publicKey, { domain })

    // Check if this is a new user
    router.push(user ? '/dashboard' : '/')
  }, [auth, db, domain, router, userPkPath])

  const signOut = useCallback(async () => {
    auth.signOut()
  }, [auth])

  const value = useMemo(() => ({
    publicKey: state?.publicKey ?? null,
    loading,
    signIn,
    signOut,
  }), [state?.publicKey, loading, signIn, signOut])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}