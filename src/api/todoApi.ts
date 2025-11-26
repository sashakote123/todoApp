import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './axios';
import { ITask, TaskFormData } from 'types/types';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<ITask[]> => {
      const resp = await apiClient.get('/tasks');
      return resp.data;
    },
  });
};

export const useGetTask = (id: number | undefined) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: async (): Promise<ITask> => {
      const resp = await apiClient.get(`/tasks/${id}`);
      return resp.data;
    },
    enabled: !!id,
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | undefined): Promise<ITask> => {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TaskFormData): Promise<ITask> => {
      const response = await apiClient.post('/tasks', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useEditTask = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TaskFormData): Promise<ITask> => {
      const response = await apiClient.patch(`/tasks/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
