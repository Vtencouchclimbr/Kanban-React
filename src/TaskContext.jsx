import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Done: []
  });

  const [newTask, setNewTask] = useState("");

  const addTask = column => {
    if (newTask.trim()) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [column]: [...prevTasks[column], newTask.trim()]
      }));
      setNewTask("");
    }
  };

  const deleteTask = (taskId, column) => {
    setTasks(prevTasks => {
      const newColumnTasks = prevTasks[column].filter(
        task => task.id !== taskId
      );
      return {
        ...prevTasks,
        [column]: newColumnTasks
      };
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, newTask, setNewTask, addTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  return useContext(TaskContext);
};