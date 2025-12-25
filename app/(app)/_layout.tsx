import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

import { useStore } from '@/store'

export default function AppLayout() {
  const router = useRouter()
  const authState = useStore((state) => state.authState)

  useEffect(() => {
    if (authState === 'unauthenticated') {
      router.replace('/(auth)/login')
    }
  }, [authState, router])

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        contentStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    />
  )
}
