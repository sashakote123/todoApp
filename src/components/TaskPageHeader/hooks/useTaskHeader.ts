import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'app/store/authUserClice';
import { updateFilter, updateView } from 'app/store/currentFilterScile';
import { RootState } from 'app/store/store';
import { FilterType, IAuthData, ViewType } from 'types/types';

interface HookResult {
  filterValue: FilterType;
  user: IAuthData;
  currentView: ViewType;
  isWindowVisible: boolean;
  setIsWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLogout: () => void;
  handleViewChange: (view: ViewType) => void;
}

const useTaskHeader = (): HookResult => {
  const filterValue = useSelector((state: RootState) => state.currentFilter.currentFilter);
  const currentView = useSelector((state: RootState) => state.currentFilter.currentView);
  const user = useSelector((state: RootState) => state.authUser);

  const [isWindowVisible, setIsWindowVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value) as FilterType;
    dispatch(updateFilter(value));
  };

  const handleViewChange = (view: ViewType) => {
    dispatch(updateView(view));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return {
    filterValue,
    user,
    currentView,
    isWindowVisible,
    setIsWindowVisible,
    handleFilterChange,
    handleLogout,
    handleViewChange,
  };
};

export default useTaskHeader;
