export interface User {
  id: string | number;
  [key: string]: any;
}

export type UserFormData = Omit<User, "id">;
