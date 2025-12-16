import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeAuth, getAuth } from 'firebase/auth'
// @ts-expect-error: getReactNativePersistence は型定義に含まれていないが、ランタイムで存在する
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

// 既に初期化されている場合は既存のアプリを使用
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Auth の初期化（AsyncStorage で永続化）
export const auth =
  getApps().length === 1
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(app)

export default app
