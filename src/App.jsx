// src/App.jsx
import "./App.css";
import { useTaskContext } from "./TaskContext";

function KanbanColumn({ title, tasks }) {
  const { setTasks } = useTaskContext();
  const { deleteTask } = useTaskContext();

  const handleTaskMove = (task, fromColumn, toColumn) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      newTasks[fromColumn] = newTasks[fromColumn].filter(t => t.id !== task.id);
      if (!newTasks[toColumn].some(t => t.id === task.id)) {
        newTasks[toColumn].push(task);
      }
      return newTasks;
    });
  };

  return (
    <div className="col-md-4 p-3">
      <h4 className="text-center">
        {title}
      </h4>
      <ul className="list-group">
        {tasks.map(task =>
          <li key={task.id} className="list-group-item">
            {task.name}
            {["To Do", "In Progress", "Done"]
              .filter(col => col !== title)
              .map(col =>
                <button
                  key={col}
                  onClick={() => handleTaskMove(task, title, col)}
                  className="btn btn-sm btn-secondary ml-2"
                >
                  Move to {col}
                </button>
              )}
            <button
              onClick={() => deleteTask(task.id, title)}
              className="btn btn-sm btn-danger ml-2"
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

function App() {
  const { tasks, newTask, setNewTask, addTask } = useTaskContext();

  const handleInputChange = event => {
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
          <button className="btn btn-primary" onClick={() => addTask("To Do")}>
            Add Task
          </button>
        </div>
      </div>
      <div className="row d-flex">
        {Object.entries(tasks).map(([columnName, columnTasks]) =>
          <KanbanColumn
            key={columnName}
            title={columnName}
            tasks={columnTasks}
          />
        )}
      </div>
    </div>
  );
}

export default App;
