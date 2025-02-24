import React, { useState, useEffect } from 'react';
import api from '../api';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      alert('Error fetching tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, { is_complete: !task.is_complete });
      fetchTasks();
    } catch (error) {
      alert('Error updating task.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert('Error deleting task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Tasks</h2>
      <TaskForm onTaskCreated={fetchTasks} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span 
              style={{ textDecoration: task.is_complete ? 'line-through' : 'none' }}
            >
              {task.title}
            </span>
            <button onClick={() => handleToggleComplete(task)}>
              {task.is_complete ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
