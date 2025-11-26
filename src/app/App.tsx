import { Navigate, Route, Routes } from 'react-router-dom';
import TasksPage from 'components/TasksPage/TasksPage';
import AddTaskPage from 'components/AddTaskPage/AddTaskPage';
import './styles.css';
import TaskInfo from 'components/TaskInfo/TaskInfo';
import ProtectedRoute from 'src/providers/ProtectedRoute';
import LoginPage from 'components/LoginPage/LoginPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }>
          <Route path="task/:id" element={<TaskInfo />} />
          <Route path="addTask" element={<AddTaskPage type="add" />} />
          <Route path="task/:id/edit" element={<AddTaskPage type="edit" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};
export default App;
