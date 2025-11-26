import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import useFilteredList from './hooks/useFilteredList';
import TaskItem from 'components/TaskItem/TaskItem';
import { ITask } from 'types/types';

interface Props {
  title: string;
}

const TaskList: React.FC<Props> = ({ title }) => {
  const { filteredArray, currentView, isLoading, error } = useFilteredList();

  if (isLoading) return <div>Loading materials...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <section className={styles.taskListSection}>
      <div className={styles.sectionTitle}>{title}</div>
      <Link className={styles.addTaskBtn} to={'/addTask'}>
        <span>+</span>
        Добавить задачу
      </Link>
      <ul className={`${currentView === 1 ? styles.taskList : styles.taskListBoard}`}>
        {filteredArray?.map((item: ITask) => {
          return <TaskItem key={item.id} item={item} />;
        })}
      </ul>
    </section>
  );
};
export default TaskList;
