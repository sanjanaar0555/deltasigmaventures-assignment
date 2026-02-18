# deltasigmaventures-assignment

# ⚡ UserFlow — React CRUD User Management App

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON--Server-Mock%20API-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> A clean, extensible React + TypeScript CRUD application for managing user data — built as a technical assignment demonstrating schema-driven architecture, form validation, and REST API integration.

---

## 🌐 Live Demo

🔗 **[View Live App](#)** ← *(Add your Vercel/Netlify link here)*  
📦 **[GitHub Repository](#)** ← *(Add your GitHub link here)*

---

## 📸 Screenshots

> *(Add screenshots of your app here after deployment)*

---


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 |
| Language | TypeScript |
| Form Handling | React Hook Form |
| HTTP Client | Axios |
| Mock API | JSON-server |
| Styling | Custom CSS (Dark Theme) |
| Version Control | Git + GitHub |

---

## 📁 Project Structure

```
user-manager/
├── public/
│   └── index.html
├── src/
│   ├── config/
│   │   └── fieldConfig.ts       ← ⭐ ALL fields defined here (schema)
│   ├── types/
│   │   └── user.ts              ← TypeScript interfaces
│   ├── services/
│   │   └── userService.ts       ← Axios API calls (CRUD)
│   ├── hooks/
│   │   └── useUsers.ts          ← Custom hook: state + async logic
│   ├── components/
│   │   ├── UserForm.tsx         ← Schema-driven form component
│   │   └── UserTable.tsx        ← Schema-driven table component
│   ├── App.tsx                  ← Root component
│   ├── App.css                  ← All styling
│   └── index.tsx                ← Entry point
├── db.json                      ← Mock database (JSON-server)
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

Make sure you have these installed:

- **Node.js** (v16 or above) — [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** — [Download here](https://git-scm.com)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/user-manager.git
cd user-manager
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

> ⚠️ Ignore the deprecation warnings — they are from internal React Scripts dependencies and do not affect the app.

---

### Step 3 — Start the Mock API (JSON-server)

Open a **new terminal window** and run:

```bash
npx json-server --watch db.json --port 3001
```

You should see:

```
\{^_^}/ hi!

Resources
http://localhost:3001/users

Home
http://localhost:3001
```


---

### Step 4 — Start the React App

In your **original terminal**, run:

```bash
npm start
```

The app will open automatically at:

```
http://localhost:3000
```

---

### ✅ Both Terminals Must Run Together

| Terminal | Command | URL |
|---|---|---|
| Terminal 1 | `npm start` | http://localhost:3000 |
| Terminal 2 | `npx json-server --watch db.json --port 3001` | http://localhost:3001/users |

---

## ➕ How to Add a New Field

This is the most important feature of this app — **adding a new field requires editing only ONE file.**

### Example: Adding a "Date of Birth" field

**Step 1** — Open `src/config/fieldConfig.ts` and add:

```ts
{
  key: "dob",
  label: "Date of Birth",
  type: "date",
  placeholder: "",
  required: false,
  validation: {
    message: "Enter a valid date",
  },
},
```

**Step 2** — Open `src/types/user.ts` and add the key to the User interface:

```ts
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob?: string;   // ← add this
}
```

**That's it!** 
- The user form (with validation)
- The users table (as a new column)
- Edit mode (pre-filled correctly)
- API payloads (sent automatically)

**No changes needed** in `UserForm.tsx`, `UserTable.tsx`, or any other file.

---

## 🔄 How Data Flows

```
User fills the form
        ↓
React Hook Form validates (using fieldConfig rules)
        ↓
App.tsx calls createUser() or updateUser()
        ↓
useUsers hook calls userService (Axios)
        ↓
Axios sends HTTP request to JSON-server
        ↓
JSON-server saves to db.json, returns response
        ↓
useUsers updates the users[] state
        ↓
React re-renders the table with new data
        ↓

```

---

## 🌐 API Endpoints (JSON-server)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Fetch all users |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

---

## 🌍 Deployment

##

---

## 🎯 Design Decisions

### 1. Config-Driven UI (Schema Architecture)
All form fields are defined as objects in `fieldConfig.ts`. Both `UserForm` and `UserTable` loop over this config dynamically — meaning the entire UI updates from a single source of truth.

### 2. Custom Hook for Separation of Concerns
`useUsers.ts` contains all async logic and state management. UI components remain clean and focused purely on rendering.

### 3. TypeScript Throughout
Every component, hook, and service is fully typed. This prevents runtime errors and makes the codebase self-documenting.

### 4. Validation via React Hook Form
Validation rules are derived directly from `fieldConfig.ts` and passed to React Hook Form's `register()` — making validation also config-driven.

### 5. Toast Notification System
A lightweight custom toast system provides feedback after every Create, Update, and Delete action with auto-dismiss after 3.5 seconds.

---

## 📋 Assumptions

- The API follows standard REST conventions
- JSON-server is used as the mock backend; `db.json` acts as persistent storage
- No authentication is required for this implementation
- Deprecation warnings from `npm install` are from internal React Scripts dependencies — they are safe to ignore

---


**Sanjana Madhukar Rathod**  


---


