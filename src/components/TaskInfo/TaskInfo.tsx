import { Link } from 'react-router-dom';
import styles from './styles.module.css';

import CloseIcon from './assets/Close.svg';
import DeleteIcon from './assets/Delete.svg';
import EditIcon from './assets/Edit.svg';
import CheckIcon from './assets/Check.svg';
import useTaskInfo from './hooks/useTaskInfo';
import QueryAlert from 'components/QueryAlert/QueryAlert';

const TaskInfo = () => {
  const { item, id, isLoading, error, confirmDelete, setConfirmDelete, handleDeleteTask, alert } = useTaskInfo();

  if (!item) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <section className={styles.taskInfo}>
      <div className={styles.header}>
        <Link to={'/'} className={styles.closeBtn}>
          <CloseIcon />
        </Link>

        <div className={styles.taskID}>Task:{item.id}</div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoTop}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.info}>{item.info}</div>
        </div>

        <div className={styles.infoBottom}>
          {item.isCompleted && (
            <div className={styles.completeBox}>
              <CheckIcon />
              Задача выполнена
            </div>
          )}
          <div className={styles.buttons}>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)} className={styles.deleteBtn}>
                <DeleteIcon />
                Удалить
              </button>
            ) : (
              <button onClick={() => handleDeleteTask(item.id)} className={styles.confirmDeleteBtn}>
                <DeleteIcon />
                Подтвердить
              </button>
            )}

            <Link to={`/task/${id}/edit`} className={styles.editBtn}>
              <EditIcon />
              Редактировать
            </Link>
          </div>
        </div>
      </div>
      {alert && <QueryAlert type={alert.type} title={alert.text} />}
    </section>
  );
};
export default TaskInfo;
