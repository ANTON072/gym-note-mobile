import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiClient, ApiError } from '@/lib/api/client'
import type { components } from '@/types/api'
import { trainingSessionKeys } from './useTrainingSessionApi'

type Workout = components['schemas']['Workout']
type WorkoutAddRequest = components['schemas']['WorkoutAddRequest']
type WorkoutUpdateRequest = components['schemas']['WorkoutUpdateRequest']
type WorkoutReorderRequest = components['schemas']['WorkoutReorderRequest']
type MessageResponse = components['schemas']['MessageResponse']

// Query Keys
export const workoutKeys = {
  all: ['workouts'] as const,
  details: () => [...workoutKeys.all, 'detail'] as const,
  detail: (id: string) => [...workoutKeys.details(), id] as const,
}

// Mutation Hooks

// ワークアウト追加
type AddWorkoutVariables = {
  sessionId: string
  input: WorkoutAddRequest
}

export const useAddWorkout = (
  options?: Omit<
    UseMutationOptions<Workout, ApiError, AddWorkoutVariables, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<Workout, ApiError, AddWorkoutVariables, unknown>({
    mutationFn: async ({ sessionId, input }) => {
      const { data, error, response } = await apiClient.POST(
        '/api/v1/training-sessions/{sessionId}/workouts',
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
      queryClient.invalidateQueries({
        queryKey: trainingSessionKeys.detail(variables.sessionId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

// ワークアウト更新
type UpdateWorkoutVariables = {
  workoutId: string
  sessionId: string
  input: WorkoutUpdateRequest
}

export const useUpdateWorkout = (
  options?: Omit<
    UseMutationOptions<Workout, ApiError, UpdateWorkoutVariables, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<Workout, ApiError, UpdateWorkoutVariables, unknown>({
    mutationFn: async ({ workoutId, input }) => {
      const { data, error, response } = await apiClient.PUT(
        '/api/v1/workouts/{workoutId}',
        {
          params: { path: { workoutId } },
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
      queryClient.invalidateQueries({
        queryKey: trainingSessionKeys.detail(variables.sessionId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

// ワークアウト削除
type DeleteWorkoutVariables = {
  sessionId: string
  workoutId: string
}

export const useDeleteWorkout = (
  options?: Omit<
    UseMutationOptions<void, ApiError, DeleteWorkoutVariables, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, DeleteWorkoutVariables, unknown>({
    mutationFn: async ({ sessionId, workoutId }) => {
      const { error, response } = await apiClient.DELETE(
        '/api/v1/training-sessions/{sessionId}/workouts/{workoutId}',
        {
          params: { path: { sessionId, workoutId } },
        }
      )
      if (error) {
        throw new ApiError(response.status, error.message)
      }
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: trainingSessionKeys.detail(variables.sessionId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

// ワークアウト並び替え
type ReorderWorkoutsVariables = {
  sessionId: string
  input: WorkoutReorderRequest
}

export const useReorderWorkouts = (
  options?: Omit<
    UseMutationOptions<
      MessageResponse,
      ApiError,
      ReorderWorkoutsVariables,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation<
    MessageResponse,
    ApiError,
    ReorderWorkoutsVariables,
    unknown
  >({
    mutationFn: async ({ sessionId, input }) => {
      const { data, error, response } = await apiClient.PATCH(
        '/api/v1/training-sessions/{sessionId}/workouts/reorder',
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
      queryClient.invalidateQueries({
        queryKey: trainingSessionKeys.detail(variables.sessionId),
      })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}
