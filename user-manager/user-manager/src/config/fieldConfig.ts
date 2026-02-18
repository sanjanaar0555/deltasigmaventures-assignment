export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "textarea";
  placeholder: string;
  required: boolean;
  validation: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message: string;
  };
}

// ✅ TO ADD A NEW FIELD: Simply add a new entry to this array.
// No changes needed in the form component or API service.
export const USER_FIELDS: FieldConfig[] = [
  {
    key: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
      message: "First name must be 2–50 characters",
    },
  },
  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
      message: "Last name must be 2–50 characters",
    },
  },
  {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +91 98765 43210",
    required: true,
    validation: {
      pattern: /^[+]?[\d\s\-().]{7,15}$/,
      message: "Enter a valid phone number",
    },
  },
  {
    key: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  // 👇 Example: Uncomment to add a new field instantly
  // {
  //   key: "dob",
  //   label: "Date of Birth",
  //   type: "date",
  //   placeholder: "",
  //   required: false,
  //   validation: { message: "Enter a valid date" },
  // },
];
