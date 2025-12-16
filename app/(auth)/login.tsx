import { GoogleLoginButton } from '@/components/auth'
import { Box, Text } from '@/components/common'

export default function LoginPage() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" gap="l">
      <Text fontFamily="Roboto_700Bold" fontSize={40} lineHeight={40}>
        GYM NOTE
      </Text>
      <Box>
        <GoogleLoginButton
          onPress={() => {
            console.log('Google Login Pressed')
          }}
        />
      </Box>
    </Box>
  )
}
