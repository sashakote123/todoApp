import useQueryAlert from './hooks/useQueryAlert';

interface Props {
  type: 'success' | 'alert' | 'error';
  title: string;
  duration?: number;
}
const QueryAlert: React.FC<Props> = ({ type, title, duration = 2000 }) => {
  const { show, getTitle, getAlertClass } = useQueryAlert(type, title, duration);

  if (!show) return null;
  return <div className={getAlertClass()}>{getTitle()}</div>;
};
export default QueryAlert;
