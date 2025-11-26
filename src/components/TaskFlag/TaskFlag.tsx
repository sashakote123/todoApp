import styles from './styles.module.css';

interface Props {
  title: string;
}
const TaskFlag: React.FC<Props> = ({ title }) => {
  return <div className={styles.flag}>{title}</div>;
};
export default TaskFlag;
