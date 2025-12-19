import createClient, { type Middleware } from 'openapi-fetch'
import { signOut } from 'firebase/auth'

import { auth } from '@/lib/firebase/config'
import type { paths } from '@/types/api'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const user = auth.currentUser
    if (!user) {
      await signOut(auth)
      throw new ApiError(401, 'Not authenticated')
    }
    const idToken = await user.getIdToken()
    request.headers.set('Authorization', `Bearer ${idToken}`)
    return request
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      await signOut(auth)
    }
    return response
  },
}

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
})

apiClient.use(authMiddleware)
