import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import CheckboxIcon from './assets/checkbox.svg';
import StarIcon from './assets/Star.svg';
import { ITask } from 'types/types';
import TaskFlag from 'components/TaskFlag/TaskFlag';
import { RootState } from 'app/store/store';

interface Props {
  item: ITask;
}

const TaskItem: React.FC<Props> = ({ item }) => {
  const currentView = useSelector((state: RootState) => state.currentFilter.currentView);

  return (
    <Link to={`task/${item.id}`}>
      <li className={`${currentView === 1 ? styles.taskItem : styles.taskItemBoard}`}>
        {currentView === 1 && <button className={styles.itemCheckbox}>{item.isCompleted && <CheckboxIcon />}</button>}
        {currentView === 1 ? (
          <div className={styles.itemName}>{item.name}</div>
        ) : (
          <div className={styles.itemNameBoard}>
            <div className={styles.itemNameBoardText}>{item.name}</div>
            {item.isImportant && currentView === 2 && <StarIcon />}
          </div>
        )}

        {currentView === 2 && <div className={styles.itemInfoBoard}>{item.info}</div>}
        {item.isImportant && currentView === 1 && <TaskFlag title="Важное" />}
      </li>
    </Link>
  );
};

export default TaskItem;
