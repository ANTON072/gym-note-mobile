import { useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import * as Burnt from 'burnt'
import { auth } from '@/lib/firebase/config'
import { useStore } from '@/store'

// 認証後にアプリに戻った時の処理を完了させる（全環境で必要）
WebBrowser.maybeCompleteAuthSession()

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAuthState = useStore((state) => state.setAuthState)

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  })

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        setIsLoading(true)
        setError(null)

        try {
          const { id_token } = response.params
          const credential = GoogleAuthProvider.credential(id_token)
          await signInWithCredential(auth, credential)
          // onAuthStateChanged が状態を更新するので、ここでは何もしない
          Burnt.toast({
            title: 'ログインしました',
            preset: 'done',
          })
        } catch (e) {
          console.error('Firebase sign in error:', e)
          setError('ログインに失敗しました')
          setAuthState('unauthenticated')
        } finally {
          setIsLoading(false)
        }
      } else if (response?.type === 'error') {
        console.error('Google auth error:', response.error)
        setError('Google認証に失敗しました')
      }
    }

    handleResponse()
  }, [response, setAuthState])

  const signIn = async () => {
    setError(null)
    await promptAsync()
  }

  return {
    signIn,
    isLoading,
    error,
    isReady: !!request,
  }
}
