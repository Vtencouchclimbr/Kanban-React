// src/App.jsx
import "./App.css";
import { useTaskContext } from "./TaskContext";
import { useState } from "react";

function KanbanColumn({ title, tasks }) {
  const { setTasks, deleteTask, editTask, archiveTask } = useTaskContext();
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
      <h4 className="text-light text-center">{title}</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ backgroundColor: "#368a44" }}
            className="list-group-item text-light"
          >
            {editingTaskId === task.id ? (
              <div className="d-flex flex-column">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  style={{ width: "300px" }}
                />
                <div className="d-flex flex-row flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-success btn-xs-custom"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary btn-xs-custom"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <div
                  className="mb-2"
                  style={{ width: "" }}
                >
                  {task.name}
                </div>
                <div className="d-flex flex-row flex-wrap gap-2">
                  {["To Do", "In Progress", "Done"]
                    .filter((col) => col !== title)
                    .map((col) => (
                      <button
                        key={col}
                        onClick={() => handleTaskMove(task, title, col)}
                        className="btn btn-sm btn-secondary btn-xs-custom border"
                      >
                        To {col}
                      </button>
                    ))}
                  <button
                    onClick={() => startEditing(task)}
                    className="btn btn-sm btn-warning btn-xs-custom border"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => archiveTask(task, title)}
                    className="btn btn-sm btn-info btn-xs-custom border"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => deleteTask(task.id, title)}
                    className="btn btn-sm btn-danger btn-xs-custom border"
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
  const { tasks, newTask, setNewTask, addTask, archivedTasks, restoreTask } = useTaskContext();
  const [showArchive, setShowArchive] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask("To Do");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-light text-center mb-4">Kanban Board</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
      <div className="mt-4">
        <button
          className="border btn btn-secondary"
          onClick={() => setShowArchive(!showArchive)}
        >
          {showArchive ? "Hide Archive" : "Show Archive"}
        </button>
        {showArchive && (
          <div className="text-light mt-3">
            <h3>Archived Tasks</h3>
            {archivedTasks.length === 0 ? (
              <p>No archived tasks.</p>
            ) : (
              <ul className="list-group">
                {archivedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="text-light list-group-item d-flex justify-content-between align-items-center py-1"
                    style={{ backgroundColor: "#6c757d" }}
                  >
                    <span style={{ color: "" }}>
                      {task.name} (From: {task.originalColumn})
                    </span>
                    <button
                      className="btn btn-sm btn-success btn-xs-custom"
                      onClick={() => restoreTask(task.id)}
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;