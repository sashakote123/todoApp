import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import ListIcon from './assets/List.svg';
import ListActiveIcon from './assets/ListActive.svg';
import BoardIcon from './assets/Board.svg';
import BoardActiveIcon from './assets/BoardActive.svg';
import AvatarIcon from './assets/Avatar.svg';
import useTaskHeader from './hooks/useTaskHeader';
import { FilterType } from 'types/types';

const TaskPageHeader = () => {
  const {
    filterValue,
    user,
    currentView,
    isWindowVisible,
    setIsWindowVisible,
    handleFilterChange,
    handleLogout,
    handleViewChange,
  } = useTaskHeader();

  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerTitle}>
        <button onClick={() => setIsWindowVisible((prev) => !prev)} className={styles.avatarBtn}>
          <AvatarIcon />
        </button>
        <h3 className={styles.titleText}>Мои задачи</h3>
        {isWindowVisible && (
          <div className={styles.userInfo}>
            <div className={styles.userInfoText}>Имя пользователя: {user.name}</div>
            <div className={styles.userInfoText}>Почта: {user.mail}</div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Выйти
            </button>
          </div>
        )}
      </div>
      <div className={styles.headerButtons}>
        <div className={styles.view}>
          <button
            className={`${styles.viewBtnLeft} ${currentView === 1 ? styles.active : ''}`}
            onClick={() => handleViewChange(1)}>
            {currentView === 1 ? <ListActiveIcon /> : <ListIcon />}
            Список
          </button>
          <button
            className={`${styles.viewBtnRight} ${currentView === 2 ? styles.active : ''}`}
            onClick={() => handleViewChange(2)}>
            {currentView === 2 ? <BoardActiveIcon /> : <BoardIcon />}
            Плитки
          </button>
        </div>
        <div className={styles.filter}>
          <select value={filterValue} onChange={handleFilterChange}>
            <option value={FilterType.ALL}>Всё</option>
            <option value={FilterType.INCOMPLETE}>Невыполненные</option>
            <option value={FilterType.COMPLETED}>Выполненные</option>
            <option value={FilterType.IMPORTANT}>Важные</option>
          </select>
        </div>
        <Link className={styles.addTaskBtn} to={'/addTask'}>
          <span>+</span>
          Добавить задачу
        </Link>
      </div>
    </div>
  );
};
export default TaskPageHeader;
