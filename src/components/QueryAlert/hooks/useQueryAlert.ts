import { useEffect, useState } from 'react';
import styles from './../styles.module.css';

const useQueryAlert = (type: 'success' | 'alert' | 'error', title: string, duration: number) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const getAlertClass = () => {
    const typeClass = type === 'success' ? styles.sucsess : type === 'alert' ? styles.alert2 : styles.error;

    return `${styles.alert} ${typeClass} ${styles.show}`;
  };

  const getTitle = () => {
    if (type === 'error') {
      return `Ошибка: ${title}`;
    }
    return title;
  };

  return { show, getTitle, getAlertClass };
};

export default useQueryAlert;
