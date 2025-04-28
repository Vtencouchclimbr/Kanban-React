import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          'To Do': [],
          'In Progress': [],
          'Done': [],
        };
  });

  const [archivedTasks, setArchivedTasks] = useState(() => {
    const savedArchivedTasks = localStorage.getItem('kanban-archived-tasks');
    return savedArchivedTasks ? JSON.parse(savedArchivedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-archived-tasks', JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  const addTask = (column) => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
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

  const archiveTask = (task, column) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((t) => t.id !== task.id),
    }));
    setArchivedTasks((prev) => [...prev, { ...task, originalColumn: column }]);
  };

  const restoreTask = (taskId) => {
    const taskToRestore = archivedTasks.find((task) => task.id === taskId);
    if (!taskToRestore) return;

    setArchivedTasks((prev) => prev.filter((task) => task.id !== taskId));
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskToRestore.originalColumn]: [...prevTasks[taskToRestore.originalColumn], {
        id: taskToRestore.id,
        name: taskToRestore.name,
      }],
    }));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        newTask,
        setNewTask,
        addTask,
        deleteTask,
        editTask,
        archiveTask,
        archivedTasks,
        restoreTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}