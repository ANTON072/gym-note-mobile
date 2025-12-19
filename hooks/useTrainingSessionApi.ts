import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiClient, ApiError } from '@/lib/api/client'
import type { components } from '@/types/api'

type TrainingSession = components['schemas']['TrainingSession']
type TrainingSessionListResponse =
  components['schemas']['TrainingSessionListResponse']
type TrainingSessionCreateRequest =
  components['schemas']['TrainingSessionCreateRequest']
type TrainingSessionUpdateRequest =
  components['schemas']['TrainingSessionUpdateRequest']

// Query Keys
export const trainingSessionKeys = {
  all: ['trainingSessions'] as const,
  lists: () => [...trainingSessionKeys.all, 'list'] as const,
  list: (offset?: number) =>
    [...trainingSessionKeys.lists(), { offset }] as const,
  details: () => [...trainingSessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...trainingSessionKeys.details(), id] as const,
}

// Query Hooks
export const useFetchTrainingSessions = (
  offset?: number,
  options?: Omit<
    UseQueryOptions<TrainingSessionListResponse, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<TrainingSessionListResponse, ApiError>({
    queryKey: trainingSessionKeys.list(offset),
    queryFn: async () => {
      const { data, error, response } = await apiClient.GET(
        '/api/v1/training-sessions',
        {
          params: { query: { offset } },
        }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    ...options,
  })
}

export const useFetchTrainingSessionDetail = (
  sessionId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<TrainingSession, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<TrainingSession, ApiError>({
    queryKey: trainingSessionKeys.detail(sessionId ?? ''),
    queryFn: async () => {
      if (!sessionId) {
        throw new ApiError(400, 'sessionId is required')
      }
      const { data, error, response } = await apiClient.GET(
        '/api/v1/training-sessions/{sessionId}',
        {
          params: { path: { sessionId } },
        }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
      return data
    },
    enabled: !!sessionId,
    ...options,
  })
}

// Infinite Query Hook
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
        {
          params: { query: { offset: pageParam } },
        }
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

// Mutation Hooks
export const useCreateTrainingSession = (
  options?: Omit<
    UseMutationOptions<
      TrainingSession,
      ApiError,
      TrainingSessionCreateRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<
    TrainingSession,
    ApiError,
    TrainingSessionCreateRequest,
    unknown
  >({
    mutationFn: async (input) => {
      const { data, error, response } = await apiClient.POST(
        '/api/v1/training-sessions',
        {
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
      queryClient.invalidateQueries({ queryKey: trainingSessionKeys.lists() })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

type UpdateTrainingSessionVariables = {
  sessionId: string
  input: TrainingSessionUpdateRequest
}

export const useUpdateTrainingSession = (
  options?: Omit<
    UseMutationOptions<
      TrainingSession,
      ApiError,
      UpdateTrainingSessionVariables,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<
    TrainingSession,
    ApiError,
    UpdateTrainingSessionVariables,
    unknown
  >({
    mutationFn: async ({ sessionId, input }) => {
      const { data, error, response } = await apiClient.PUT(
        '/api/v1/training-sessions/{sessionId}',
        {
          params: { path: { sessionId } },
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
      queryClient.invalidateQueries({ queryKey: trainingSessionKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: trainingSessionKeys.detail(variables.sessionId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

export const useDeleteTrainingSession = (
  options?: Omit<
    UseMutationOptions<void, ApiError, string, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string, unknown>({
    mutationFn: async (sessionId) => {
      const { error, response } = await apiClient.DELETE(
        '/api/v1/training-sessions/{sessionId}',
        {
          params: { path: { sessionId } },
        }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: trainingSessionKeys.lists() })
      queryClient.removeQueries({
        queryKey: trainingSessionKeys.detail(variables),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
