# Basecamp Backend Clone

A lightweight Basecamp-inspired project management REST API built with **Node.js**, **Express**, and **MongoDB**.

## Features

- 🔐 **Authentication** — Register, login, JWT-based auth
- 📁 **Projects** — Create, update, archive, manage members
- ✅ **Todo Lists & Todos** — Organize tasks with lists, assign to members, due dates
- 💬 **Message Board** — Post announcements, pitches, questions per project
- 💬 **Comments** — Comment on messages, todos, or documents
- 📅 **Schedule** — Create events with dates and participants
- 📄 **Documents** — Create and share docs within projects

## Quick Start

```bash
# Install dependencies
npm install

# Make sure MongoDB is running, then:
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/me` | Update profile |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | List my projects |
| GET | `/api/projects/:id` | Get project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/projects/:id/members` | Add member |
| DELETE | `/api/projects/:id/members/:userId` | Remove member |

### Todo Lists & Todos
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:id/todolists` | Create todo list |
| GET | `/api/projects/:id/todolists` | Get all todo lists with todos |
| DELETE | `/api/projects/:id/todolists/:listId` | Delete todo list |
| POST | `/api/projects/:id/todos` | Create todo |
| GET | `/api/projects/:id/todos` | Get todos (filter by completed/assignedTo) |
| PUT | `/api/projects/:id/todos/:todoId` | Update todo |
| DELETE | `/api/projects/:id/todos/:todoId` | Delete todo |

### Message Board
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:id/messages` | Post message |
| GET | `/api/projects/:id/messages` | List messages |
| GET | `/api/projects/:id/messages/:msgId` | Get message |
| PUT | `/api/projects/:id/messages/:msgId` | Update message |
| DELETE | `/api/projects/:id/messages/:msgId` | Delete message |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:id/comments` | Add comment |
| GET | `/api/projects/:id/comments` | Get comments (filter by type/id) |
| DELETE | `/api/projects/:id/comments/:commentId` | Delete comment |

### Schedule
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:id/events` | Create event |
| GET | `/api/projects/:id/events` | List events |
| PUT | `/api/projects/:id/events/:eventId` | Update event |
| DELETE | `/api/projects/:id/events/:eventId` | Delete event |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:id/docs` | Create document |
| GET | `/api/projects/:id/docs` | List documents |
| GET | `/api/projects/:id/docs/:docId` | Get document |
| PUT | `/api/projects/:id/docs/:docId` | Update document |
| DELETE | `/api/projects/:id/docs/:docId` | Delete document |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/basecamp_clone` | MongoDB connection |
| `JWT_SECRET` | — | JWT signing secret |
| `JWT_EXPIRE` | 7d | Token expiry |

## Project Structure

```
├── config/db.js          # MongoDB connection
├── middleware/auth.js     # JWT auth & project membership
├── models/               # Mongoose models
│   ├── User.js
│   ├── Project.js
│   ├── TodoList.js
│   ├── Todo.js
│   ├── MessageBoard.js
│   ├── Comment.js
│   ├── ScheduleEvent.js
│   └── Document.js
├── controllers/          # Route handlers
├── routes/               # Express routers
├── server.js             # Entry point
└── .env                  # Environment config
```
