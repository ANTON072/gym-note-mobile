import { useEffect } from 'react'
import { useRouter } from 'expo-router'

import { useStore } from '@/store'

export default function Index() {
  const router = useRouter()
  const authState = useStore((state) => state.authState)

  useEffect(() => {
    if (authState === 'loading') return

    if (authState === 'authenticated') {
      router.replace('/(app)/(tabs)')
    } else {
      router.replace('/(auth)/login')
    }
  }, [authState, router])

  // 認証状態の確認中は何も表示しない
  return null
}
