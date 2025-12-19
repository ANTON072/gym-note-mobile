# API Hooks 作成パターン

TanStack Query v5 + openapi-fetch を使用した API フックの作成パターン。

## ファイル構成

```
hooks/
  use{Domain}Api.ts  # 例: useExerciseApi.ts, useWorkoutApi.ts
```

## 基本構造

### 1. インポート

```typescript
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiClient, ApiError } from '@/lib/api/client'
import type { components } from '@/types/api'
```

### 2. 型定義

OpenAPI から生成された型を使用:

```typescript
type ExerciseListResponse = components['schemas']['ExerciseListResponse']
type ExerciseRequest = components['schemas']['ExerciseRequest']
type ExerciseDetailResponse = components['schemas']['ExerciseDetailResponse']
type MessageResponse = components['schemas']['MessageResponse']
```

### 3. Query Keys（キャッシュキー）

階層的なキーファクトリパターンを使用:

```typescript
export const exerciseKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseKeys.all, 'list'] as const,
  list: () => [...exerciseKeys.lists()] as const,
  details: () => [...exerciseKeys.all, 'detail'] as const,
  detail: (id: string) => [...exerciseKeys.details(), id] as const,
}
```

### 4. Query Hooks

ライブラリの型を `Omit` で利用し、型パラメータを明示:

```typescript
export const useFetchExercises = (
  options?: Omit<
    UseQueryOptions<ExerciseListResponse, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ExerciseListResponse, ApiError>({
    queryKey: exerciseKeys.list(),
    queryFn: async () => {
      const { data, error, response } = await apiClient.GET('/api/v1/exercises')
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    ...options,
  })
}
```

### 5. パラメータ付き Query Hook

`null | undefined` を許容し、`enabled` でフェッチを制御:

```typescript
export const useFetchExerciseDetail = (
  exerciseId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<ExerciseDetailResponse, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ExerciseDetailResponse, ApiError>({
    queryKey: exerciseKeys.detail(exerciseId ?? ''),
    queryFn: async () => {
      if (!exerciseId) {
        throw new ApiError(400, 'exerciseId is required')
      }
      const { data, error, response } = await apiClient.GET(
        '/api/v1/exercises/{exerciseId}',
        { params: { path: { exerciseId } } }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    enabled: !!exerciseId,
    ...options,
  })
}
```

### 6. Infinite Query Hook

ページング対応の無限スクロール用:

```typescript
type InfiniteQueryOptions = {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  refetchOnReconnect?: boolean
  retry?: boolean | number
}

export const useInfiniteTrainingSessions = (options?: InfiniteQueryOptions) => {
  return useInfiniteQuery({
    queryKey: trainingSessionKeys.lists(),
    queryFn: async ({ pageParam }) => {
      const { data, error, response } = await apiClient.GET(
        '/api/v1/training-sessions',
        { params: { query: { offset: pageParam } } }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { paging } = lastPage
      const nextOffset = paging.offset + paging.limit
      return nextOffset < paging.total ? nextOffset : undefined
    },
    ...options,
  })
}
```

### 7. Mutation Hooks

4つの型パラメータ `<TData, TError, TVariables, TContext>` を指定:

#### Create（作成）

```typescript
export const useCreateExercise = (
  options?: Omit<
    UseMutationOptions<ExerciseDetailResponse, ApiError, ExerciseRequest, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<ExerciseDetailResponse, ApiError, ExerciseRequest, unknown>({
    mutationFn: async (input) => {
      const { data, error, response } = await apiClient.POST(
        '/api/v1/exercises',
        { body: input }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
```

#### Update（更新）

```typescript
type UpdateExerciseVariables = {
  exerciseId: string
  input: ExerciseRequest
}

export const useUpdateExercise = (
  options?: Omit<
    UseMutationOptions<
      ExerciseDetailResponse,
      ApiError,
      UpdateExerciseVariables,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<
    ExerciseDetailResponse,
    ApiError,
    UpdateExerciseVariables,
    unknown
  >({
    mutationFn: async ({ exerciseId, input }) => {
      const { data, error, response } = await apiClient.PUT(
        '/api/v1/exercises/{exerciseId}',
        {
          params: { path: { exerciseId } },
          body: input,
        }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: exerciseKeys.detail(variables.exerciseId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
```

#### Delete（削除）

```typescript
export const useDeleteExercise = (
  options?: Omit<
    UseMutationOptions<MessageResponse, ApiError, string, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<MessageResponse, ApiError, string, unknown>({
    mutationFn: async (exerciseId) => {
      const { data, error, response } = await apiClient.DELETE(
        '/api/v1/exercises/{exerciseId}',
        { params: { path: { exerciseId } } }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() })
      queryClient.removeQueries({ queryKey: exerciseKeys.detail(variables) })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
```

## エラーハンドリング

`ApiError` を使用してステータスコードとメッセージを保持:

```typescript
// lib/api/client.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
```

使用側でステータスコードに応じた処理が可能:

```typescript
const { mutate } = useCreateExercise({
  onError: (error) => {
    if (error.status === 400) {
      // バリデーションエラー
    } else if (error.status === 404) {
      // Not Found
    }
  },
})
```

## キャッシュ無効化の方針

| 操作   | 無効化対象                          |
| ------ | ----------------------------------- |
| Create | lists()                             |
| Update | lists(), detail(id)                 |
| Delete | lists() を無効化、detail(id) を削除 |

## 重要なポイント

### TanStack Query v5.90+ の onSuccess 引数

v5.90 以降では `onSuccess` の引数が4つに変更:

```typescript
onSuccess: (data, variables, onMutateResult, context) => {
  // ...
}
```

### Mutation の型パラメータ

`useMutation` と `UseMutationOptions` には4つの型パラメータが必要:

```typescript
useMutation<TData, TError, TVariables, TContext>
// 例: useMutation<ExerciseDetailResponse, ApiError, ExerciseRequest, unknown>
```

### options のスプレッド順序

`onSuccess` をオーバーライドする場合、`...options` を先に展開:

```typescript
return useMutation({
  mutationFn: async (input) => { ... },
  ...options,  // 先に展開
  onSuccess: (data, variables, onMutateResult, context) => {
    // 独自のキャッシュ無効化処理
    queryClient.invalidateQueries({ ... })
    // ユーザー指定の onSuccess を呼び出し
    options?.onSuccess?.(data, variables, onMutateResult, context)
  },
})
```

## 参考

- [TanStack Query v5 Docs](https://tanstack.com/query/latest)
- [openapi-fetch](https://openapi-ts.pages.dev/openapi-fetch/)
