import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAddTask, useEditTask, useGetTask } from 'api/todoApi';

interface FormData {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

const useAddTaskPage = (type: 'add' | 'edit') => {
  const { id } = useParams();
  const taskId = id ? parseInt(id) : 0;
  const addTask = useAddTask();
  const { data: item } = useGetTask(taskId);

  const editTask = useEditTask(taskId);

  const navigate = useNavigate();

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      info: '',
      isCompleted: false,
      isImportant: false,
    },
  });

  const isImportant = watch('isImportant');
  const isCompleted = watch('isCompleted');

  useEffect(() => {
    if (isImportant && isCompleted) {
      setError('isImportant', {
        type: 'manual',
        message: 'Задача не может быть важной и выполненной',
      });
    } else {
      clearErrors('isImportant');
    }
  }, [isImportant, isCompleted, setError, clearErrors]);

  useEffect(() => {
    if (type === 'edit' && item) {
      reset({
        name: item.name,
        info: item.info,
        isCompleted: item.isCompleted,
        isImportant: item.isImportant,
      });
    }
  }, [item, reset, type]);

  const onSubmit = async (data: FormData) => {
    try {
      if (type === 'add') {
        await addTask.mutateAsync(data);
        setAlert({ type: 'success', text: 'Задача создана!' });
      } else {
        await editTask.mutateAsync(data);
        setAlert({ type: 'success', text: 'Задача сохранена!' });
      }
    } catch (e: unknown) {
      let message = 'Ошибка запроса';

      if (e instanceof Error) {
        message = e.message;
      } else if (typeof e === 'string') {
        message = e;
      }

      setAlert({ type: 'error', text: message });
    }
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  useEffect(() => {
    document.body.classList.add('noScroll');

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  return { control, handleSubmit, errors, onSubmit, handleCancel, isImportant, isCompleted, alert };
};
export default useAddTaskPage;
