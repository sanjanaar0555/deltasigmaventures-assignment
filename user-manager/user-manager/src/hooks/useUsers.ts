import { useState, useEffect, useCallback } from "react";
import { User, UserFormData } from "../types/user";
import { userService } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      setError("Failed to fetch users. Is JSON-server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (data: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userService.create(data);
      setUsers((prev) => [...prev, newUser]);
      return true;
    } catch {
      setError("Failed to create user.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string | number, data: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await userService.update(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      return true;
    } catch {
      setError("Failed to update user.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch {
      setError("Failed to delete user.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, createUser, updateUser, deleteUser, refetch: fetchUsers };
};
