import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import * as Burnt from 'burnt'

import { Box, Text, Button } from '@/components/common'
import { auth } from '@/lib/firebase/config'
import { useStore } from '@/store'

export default function HomeScreen() {
  const router = useRouter()
  const authState = useStore((state) => state.authState)
  const user = useStore((state) => state.user)

  useEffect(() => {
    if (authState === 'unauthenticated') {
      router.replace('/(auth)/login')
    }
  }, [authState, router])

  const handleLogout = async () => {
    await signOut(auth)
    Burnt.toast({
      title: 'ログアウトしました',
      preset: 'done',
    })
  }

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="l"
      padding="m"
    >
      <Text variant="heading03">Home</Text>
      {user && (
        <Box gap="s" alignItems="center">
          <Text variant="body01">{user.displayName}</Text>
          <Text variant="body02" color="textSecondary">
            {user.email}
          </Text>
        </Box>
      )}
      <Button onPress={handleLogout} variant="secondary">
        Logout
      </Button>
    </Box>
  )
}
