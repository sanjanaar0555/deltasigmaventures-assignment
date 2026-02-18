import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { USER_FIELDS } from "../config/fieldConfig";
import { User, UserFormData } from "../types/user";

interface UserFormProps {
  editUser: User | null;
  onSubmit: (data: UserFormData) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ editUser, onSubmit, onCancel, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (editUser) {
      const { id, ...rest } = editUser;
      reset(rest);
    } else {
      reset({});
    }
  }, [editUser, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    const success = await onSubmit(data);
    if (success) reset({});
  };

  return (
    <div className="form-card">
      <h2 className="form-title">{editUser ? "✏️ Edit User" : "➕ Add New User"}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="form-grid">
          {USER_FIELDS.map((field) => (
            <div className="field-group" key={field.key}>
              <label htmlFor={field.key}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              <input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                className={errors[field.key] ? "input error" : "input"}
                {...register(field.key, {
                  required: field.required ? `${field.label} is required` : false,
                  minLength: field.validation.minLength
                    ? { value: field.validation.minLength, message: field.validation.message }
                    : undefined,
                  maxLength: field.validation.maxLength
                    ? { value: field.validation.maxLength, message: field.validation.message }
                    : undefined,
                  pattern: field.validation.pattern
                    ? { value: field.validation.pattern, message: field.validation.message }
                    : undefined,
                })}
              />
              {errors[field.key] && (
                <span className="error-msg">{errors[field.key]?.message as string}</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : editUser ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
