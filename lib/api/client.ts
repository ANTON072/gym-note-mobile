import { signOut } from 'firebase/auth'

import { auth } from '@/lib/firebase/config'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function getIdToken(): Promise<string> {
  const user = auth.currentUser
  if (!user) {
    await signOut(auth)
    throw new ApiError(401, 'Not authenticated')
  }
  return user.getIdToken()
}

export async function httpAuth<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const idToken = await getIdToken()
  const { body, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    if (response.status === 401) {
      await signOut(auth)
    }
    throw new ApiError(response.status, `API error: ${response.status}`)
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}
