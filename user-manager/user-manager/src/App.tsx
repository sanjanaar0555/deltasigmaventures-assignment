import React, { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { User, UserFormData } from "./types/user";
import "./App.css";

const App: React.FC = () => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: UserFormData): Promise<boolean> => {
    let success = false;
    if (editUser) {
      success = await updateUser(editUser.id, data);
    } else {
      success = await createUser(data);
    }
    if (success) {
      setShowForm(false);
      setEditUser(null);
    }
    return success;
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">UserFlow</span>
          </div>
          <p className="header-tagline">Manage your users with ease</p>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="toolbar">
          <div className="user-count">
            <span className="count-badge">{users.length}</span>
            {users.length === 1 ? "User" : "Users"} Total
          </div>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Add New User
            </button>
          )}
        </div>

        {showForm && (
          <UserForm
            editUser={editUser}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        )}

        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={deleteUser}
          loading={loading && users.length === 0}
        />
      </main>
    </div>
  );
};

export default App;
