// src/App.jsx
import "./App.css";
import { useTaskContext } from "./TaskContext";
import { useState } from "react";

function KanbanColumn({ title, tasks }) {
  const { setTasks, deleteTask, editTask } = useTaskContext();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  const handleTaskMove = (task, fromColumn, toColumn) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      newTasks[fromColumn] = newTasks[fromColumn].filter((t) => t.id !== task.id);
      if (!newTasks[toColumn].some((t) => t.id === task.id)) {
        newTasks[toColumn].push(task);
      }
      return newTasks;
    });
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.name);
  };

  const saveEdit = (taskId) => {
    if (editTaskName.trim() === "") return;
    editTask(taskId, title, editTaskName);
    setEditingTaskId(null);
    setEditTaskName("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskName("");
  };

  return (
    <div className="col-12 col-md-4 p-3">
      <h4 className="text-center">{title}</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ backgroundColor: "" }}
            className="list-group-item text-light"
          >
            {editingTaskId === task.id ? (
              <div className="d-flex flex-column">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="mb-2 mb-md-0">{task.name}</div>
                <div className="d-flex flex-wrap">
                  {["To Do", "In Progress", "Done"]
                    .filter((col) => col !== title)
                    .map((col) => (
                      <button
                        key={col}
                        onClick={() => handleTaskMove(task, title, col)}
                        className="btn btn-sm btn-secondary mb-2 mb-md-0 mx-md-1 border"
                      >
                        Move to {col}
                      </button>
                    ))}
                  <button
                    onClick={() => startEditing(task)}
                    className="btn btn-sm btn-warning mb-2 mb-md-0 mx-md-1 border"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id, title)}
                    className="btn btn-sm btn-danger mb-2 mb-md-0 mx-md-1 border"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const { tasks, newTask, setNewTask, addTask } = useTaskContext();

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Kanban Board</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Task"
          value={newTask}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            onClick={() => addTask("To Do")}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="row d-flex flex-column flex-md-row">
        {Object.entries(tasks).map(([columnName, columnTasks]) => (
          <KanbanColumn
            key={columnName}
            title={columnName}
            tasks={columnTasks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;