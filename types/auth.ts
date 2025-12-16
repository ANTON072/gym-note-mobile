/** 認証状態 */
export type AuthState =
  | 'loading' // 初期化中・認証状態確認中
  | 'authenticated' // ログイン済み
  | 'unauthenticated' // 未ログイン

/** ユーザー情報 */
export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}
