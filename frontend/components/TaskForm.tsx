import React, { useState } from 'react';
import api from '../api';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (error) {
      alert('Error creating task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Task</h3>
      <input 
        type="text" 
        placeholder="Task title" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        required 
      />
      <textarea 
        placeholder="Description (optional)" 
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
