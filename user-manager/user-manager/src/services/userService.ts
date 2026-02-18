import axios from "axios";
import { User, UserFormData } from "../types/user";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/users";

const api = axios.create({ baseURL: BASE_URL });

export const userService = {
  getAll: async (): Promise<User[]> => {
    const res = await api.get("/");
    return res.data;
  },

  create: async (data: UserFormData): Promise<User> => {
    const res = await api.post("/", data);
    return res.data;
  },

  update: async (id: string | number, data: UserFormData): Promise<User> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
