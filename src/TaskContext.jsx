// src/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage on initialization
    const savedTasks = localStorage.getItem('kanban-tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          'To Do': [],
          'In Progress': [],
          'Done': [],
        };
  });
  const [newTask, setNewTask] = useState('');

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (column) => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(), // Simple unique ID
      name: newTask,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...prevTasks[column], task],
    }));
    setNewTask('');
  };

  const deleteTask = (taskId, column) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((task) => task.id !== taskId),
    }));
  };

  const editTask = (taskId, column, newName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      ),
    }));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, newTask, setNewTask, addTask, deleteTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}