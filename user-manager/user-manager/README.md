# ⚡ UserFlow — React CRUD User Management App

A clean, extensible React + TypeScript application for managing users via a REST API, built as a technical test assignment.

**Live Demo:** [Deploy link here after deployment]  
**GitHub:** [Your repo URL here]

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Forms | React Hook Form |
| API Client | Axios |
| Mock API | JSON-server |
| Styling | Custom CSS (no UI library dep) |

---

## 📦 Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd user-manager
npm install
```

### 2. Start the Mock API (JSON-server)

```bash
npm run mock-api
```

This starts a REST API at `http://localhost:3001/users` using `db.json` as the database.

### 3. Start the React App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip:** You can run both simultaneously with `npx concurrently "npm run mock-api" "npm start"`

---

## ➕ How to Add a New Field

This app uses a **config-driven architecture**. All form fields are defined in a single file:

```
src/config/fieldConfig.ts
```

To add a new field (e.g., "Date of Birth"), simply add an entry to the `USER_FIELDS` array:

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

**That's it.** The field will automatically appear in:
- ✅ The user form (with validation)
- ✅ The users table (as a new column)
- ✅ Edit mode (pre-populated correctly)
- ✅ API payloads (sent automatically)

No changes needed anywhere else in the codebase.

---

## 🏗️ Project Structure

```
src/
├── config/
│   └── fieldConfig.ts      # ← Schema: all fields defined here
├── types/
│   └── user.ts             # TypeScript interfaces
├── services/
│   └── userService.ts      # Axios API calls (CRUD)
├── hooks/
│   └── useUsers.ts         # Custom hook: state + async logic
├── components/
│   ├── UserForm.tsx        # Schema-driven form (reads fieldConfig)
│   └── UserTable.tsx       # Schema-driven table (reads fieldConfig)
├── App.tsx                 # Root component: wires everything
└── App.css                 # Styling
```

---

## 🎯 Design Decisions

### Config-Driven UI
Instead of hardcoding form fields, all fields are defined in `fieldConfig.ts` as a typed array of `FieldConfig` objects. Both `UserForm` and `UserTable` dynamically render from this config — meaning adding a field in one place updates the entire app.

### Custom Hook for State Management
`useUsers.ts` separates all async logic and state from UI components, following the separation-of-concerns principle. Components remain clean and focused on rendering.

### TypeScript Throughout
All components, hooks, and services are fully typed. The `User` type uses an index signature (`[key: string]: any`) to support dynamic field keys without breaking type safety.

### Validation via React Hook Form
Validation rules are derived from `fieldConfig.ts` and passed directly to `react-hook-form`'s `register()` — so validation is also config-driven and requires no manual updates when fields are added.

---

## 🌐 Deployment

### Deploy to Netlify

1. Build the app: `npm run build`
2. Deploy the `build/` folder to Netlify
3. Set environment variable: `REACT_APP_API_URL=<your-production-api-url>`

> For the mock API in production, deploy JSON-server to Railway or Render and set the `REACT_APP_API_URL` accordingly.

---

## 📋 Assumptions

- The API follows standard REST conventions (`GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`)
- JSON-server is used as the mock API; `db.json` serves as the persistent store
- No authentication is required for this implementation
- Error boundaries and toast notifications can be added as next steps
