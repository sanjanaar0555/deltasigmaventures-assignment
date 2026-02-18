import React from "react";
import { USER_FIELDS } from "../config/fieldConfig";
import { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string | number) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👤</div>
        <p>No users yet. Add your first user above!</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            {USER_FIELDS.map((f) => (
              <th key={f.key}>{f.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} className="table-row">
              <td className="row-num">{i + 1}</td>
              {USER_FIELDS.map((f) => (
                <td key={f.key}>{user[f.key] || "—"}</td>
              ))}
              <td className="actions-cell">
                <button className="btn-icon edit" onClick={() => onEdit(user)} title="Edit">
                  ✏️
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => {
                    if (window.confirm("Delete this user?")) onDelete(user.id);
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
