import { Controller } from 'react-hook-form';
import styles from './styles.module.css';
import useAddTaskPage from './hooks/useAddTaskPage';
import QueryAlert from 'components/QueryAlert/QueryAlert';

interface Props {
  type: 'add' | 'edit';
}

const AddTaskPage: React.FC<Props> = ({ type }) => {
  const { control, handleSubmit, errors, onSubmit, handleCancel, isCompleted, alert } = useAddTaskPage(type);

  return (
    <>
      <section className={styles.addTaskContainer}>
        <h2 className={styles.containerTitle}>{type === 'add' ? 'Создание задачи' : 'Редактирование задачи'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formSection}>
            <label className={styles.formLabel}>Заголовок задачи</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Название обязательно' }}
              render={({ field }) => (
                <input className={styles.textfield} placeholder="Заголовок" {...field} type="text" />
              )}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Описание задачи</label>
            <Controller
              name="info"
              control={control}
              rules={{
                required: 'Описание обязательно',
              }}
              render={({ field }) => <textarea placeholder="Описание" className={styles.textarea} {...field} />}
            />
            {errors.info && <span className={styles.errorMessage}>{errors.info.message}</span>}
          </div>

          <div className={styles.formSection}>
            <Controller
              name="isImportant"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => {
                      if (isCompleted) {
                        return;
                      }
                      field.onChange(e.target.checked);
                    }}
                    disabled={isCompleted}
                  />
                  Важная задача
                </label>
              )}
            />
            {errors.isImportant && <span className={styles.errorMessage}>{errors.isImportant.message}</span>}
          </div>

          <div className={styles.formSection}>
            <Controller
              name="isCompleted"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      field.onChange(newValue);
                    }}
                  />
                  Задача выполнена
                </label>
              )}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.addTaskBtn} type="submit">
              {type === 'add' ? 'Создать задачу' : 'Сохранить изменения'}
            </button>
            <button onClick={handleCancel} className={styles.cancel} type="button">
              Отменить
            </button>
          </div>
        </form>
      </section>
      <div className={styles.overlay}></div>
      {alert && <QueryAlert type={alert.type} title={alert.text} />}
    </>
  );
};
export default AddTaskPage;
