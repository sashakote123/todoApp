import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTasks } from 'api/todoApi';
import { RootState } from 'app/store/store';
import { ITask, ViewType } from 'types/types';

interface HookResult {
  filteredArray: ITask[] | undefined;
  currentView: ViewType;
  isLoading: boolean;
  error: Error | null;
}

const useFilteredList = (): HookResult => {
  const { data: array, isLoading, error } = useGetTasks();

  const [filteredArray, setFilteredArray] = useState(array);

  const filterValue = useSelector((state: RootState) => state.currentFilter.currentFilter);
  const currentView = useSelector((state: RootState) => state.currentFilter.currentView);

  useEffect(() => {
    switch (filterValue) {
      case 1:
        setFilteredArray(array);
        break;
      case 2:
        setFilteredArray(array?.filter((item: ITask) => !item.isCompleted));
        break;
      case 3:
        setFilteredArray(array?.filter((item: ITask) => item.isCompleted));
        break;
      case 4:
        setFilteredArray(array?.filter((item: ITask) => item.isImportant));
        break;
    }
  }, [filterValue, array]);

  return { filteredArray, currentView, isLoading, error };
};

export default useFilteredList;
