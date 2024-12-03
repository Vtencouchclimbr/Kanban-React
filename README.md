# Kanban Board

## Table of Contents
1. [Project Overview](#project-overview)
2. [Deployed Site](#deployed-site)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [Featured Code](#featured-code)
7. [License](#license)
8. [Contributors](#contributors)
9. [Questions](#questions)

## Project Overview
A React-based Kanban board for task management, utilizing React Context for state management. This application allows users to add, move, and delete tasks across "To Do", "In Progress", and "Done" columns, with a responsive design using Bootstrap for mobile and desktop views.

## Deployed Site
[Deployed Site:](https://kanban-react-jesse.netlify.app/)

## Features
- **Task Management**: Users can add new tasks, move tasks between columns, and delete tasks.
- **Responsive Layout**: Designed with Bootstrap to adapt to both mobile and desktop environments.
- **State Management**: Leverages React Context API to manage task states efficiently.
- **Customizable Columns**: Tasks can be moved between "To Do", "In Progress", and "Done" columns.
- **User Interface**: Features a clean, intuitive UI with buttons for task actions.

## Technologies Used
### **Frontend**:
- React
- Bootstrap for styling
- ESLint for code quality

## Setup Instructions
### Prerequisites
- Node.js (v14+)

### Installation
1. Clone the repository:
   ```bash
   git clone [Repo URL]
   ```
2. Navigate to the project directory:
   ```bash
   cd Kanban-React
   ```
3. Install dependencies:
   ```bash
   npm run install
   ```
5. Start the development environment:
   ```bash
   npm run dev
   ```
6. Access the app at `http://localhost:5173`.

## Featured Code
Generate unique id
``` 
const [nextId, setNextId] = useState(1);
```
Add a task with an id
```
{ id: nextId, name: newTask.trim() } // Add task with ID
```

## License
This project is licensed under the MIT license.

## Contributors
- [Jesse Anderson](https://github.com/Vtencouchclimbr)

## Questions
If you have any questions, please reach out to me:
- Github: [vtencouchclimbr](https://github.com/vtencouchclimbr)
- Email: lmntrylmnt@gmail.com