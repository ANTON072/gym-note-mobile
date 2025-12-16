import { useEffect } from 'react'
import { useRouter } from 'expo-router'

import { GoogleLoginButton } from '@/components/auth'
import { Box, Text } from '@/components/common'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { useStore } from '@/store'

export default function LoginPage() {
  const router = useRouter()
  const authState = useStore((state) => state.authState)
  const { signIn, isLoading, error, isReady } = useGoogleAuth()

  useEffect(() => {
    if (authState === 'authenticated') {
      router.replace('/(tabs)')
    }
  }, [authState, router])

  return (
    <Box flex={1} justifyContent="center" alignItems="center" gap="l">
      <Text fontFamily="Roboto_700Bold" fontSize={40} lineHeight={40}>
        Gym Note
      </Text>
      <Box>
        <GoogleLoginButton onPress={signIn} disabled={!isReady || isLoading} />
      </Box>
      {error && (
        <Text color="supportError" variant="body02">
          {error}
        </Text>
      )}
    </Box>
  )
}
