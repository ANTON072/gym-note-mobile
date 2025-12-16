import { Redirect } from 'expo-router'
import { useState } from 'react'

export default function Index() {
  const [isLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />
  }

  // ログイン済みならホーム画面へ（後で実装）
  return <Redirect href="/(tabs)" />
}
