import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { useStore } from '@/store'
import type { User } from '@/types/auth'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuthState = useStore((state) => state.setAuthState)
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    // Firebase Auth の状態を監視
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }
        setUser(user)
        setAuthState('authenticated')
      } else {
        setUser(null)
        setAuthState('unauthenticated')
      }
    })

    // クリーンアップ
    return () => unsubscribe()
  }, [setAuthState, setUser])

  return <>{children}</>
}
