import { Controller } from 'react-hook-form';
import styles from './styles.module.css';
import useLoginPage from './hooks/useLoginPage';
const LoginPage = () => {
  const { control, handleSubmit, errors, onSubmit } = useLoginPage();

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.pageHeader}>Авторизация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formSection}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input className={styles.textfield} placeholder="Имя пользователя" {...field} type="text" />
            )}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
        </div>
        <div className={styles.formSection}>
          <Controller
            name="mail"
            control={control}
            render={({ field }) => <input className={styles.textfield} placeholder="Почта" {...field} type="text" />}
          />
          {errors.mail && <span className={styles.errorMessage}>{errors.mail.message}</span>}
        </div>
        <button className={styles.authBtn} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
