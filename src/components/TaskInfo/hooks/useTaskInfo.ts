import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteTask, useGetTask } from 'api/todoApi';
import { ITask } from 'types/types';

interface HookResult {
  item: ITask | undefined;
  id: string | undefined;
  isLoading: boolean;
  error: Error | null;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteTask: (id: number) => void;
  alert: { type: 'success' | 'error'; text: string } | null;
}

const useTaskInfo = (): HookResult => {
  const { id } = useParams();
  const taskId = id ? parseInt(id) : 0;
  const { data: item, isLoading, error } = useGetTask(taskId);
  const deleteTask = useDeleteTask();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const handleDeleteTask = async (id: number) => {
    await deleteTask.mutateAsync(id);
    setAlert({ type: 'success', text: 'Задача удалена' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return { item, id, isLoading, error, confirmDelete, setConfirmDelete, handleDeleteTask, alert };
};

export default useTaskInfo;
