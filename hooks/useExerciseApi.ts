import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiClient, ApiError } from '@/lib/api/client'
import type { components } from '@/types/api'

type ExerciseListResponse = components['schemas']['ExerciseListResponse']
type ExerciseRequest = components['schemas']['ExerciseRequest']
type ExerciseDetailResponse = components['schemas']['ExerciseDetailResponse']
type MessageResponse = components['schemas']['MessageResponse']

// Query Keys
export const exerciseKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseKeys.all, 'list'] as const,
  list: () => [...exerciseKeys.lists()] as const,
  details: () => [...exerciseKeys.all, 'detail'] as const,
  detail: (id: string) => [...exerciseKeys.details(), id] as const,
}

// Query Hooks
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
        {
          params: { path: { exerciseId } },
        }
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

// Mutation Hooks
export const useCreateExercise = (
  options?: Omit<
    UseMutationOptions<
      ExerciseDetailResponse,
      ApiError,
      ExerciseRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<
    ExerciseDetailResponse,
    ApiError,
    ExerciseRequest,
    unknown
  >({
    mutationFn: async (input) => {
      const { data, error, response } = await apiClient.POST(
        '/api/v1/exercises',
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
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

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
        {
          params: { path: { exerciseId } },
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
      queryClient.removeQueries({ queryKey: exerciseKeys.detail(variables) })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
