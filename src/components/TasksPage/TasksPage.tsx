import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import TaskPageHeader from 'components/TaskPageHeader/TaskPageHeader';
import TaskList from 'components/TaskList/TaskList';

const TasksPage = () => {
  return (
    <section className={styles.tasksPage}>
      <TaskPageHeader />
      <div className={styles.tasksSection}>
        <TaskList title="Новые задачи" />
        <Outlet />
      </div>
    </section>
  );
};
export default TasksPage;
