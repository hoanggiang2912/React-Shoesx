export const nameValidation = {
  name: "name",
  label: "name",
  type: "text",
  id: "name",
  placeholder: "Full name",
  validation: {
    required: {
      value: true,
      message: `Name is required`,
    },
    minLength: {
      value: 2,
      message: "Name have at least 2 characters",
    },
    maxLength: {
      value: 32,
      message: "Name have at most 32 characters",
    },
  },
};

export const emailValidation = {
  name: "email",
  label: "email",
  type: "text",
  id: "email",
  placeholder: "Email",
  validation: {
    required: {
      value: true,
      message: `Email is required`,
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
};

export const passwordValidation = {
  name: "password",
  label: "password",
  type: "password",
  id: "password",
  placeholder: "Password",
  validation: {
    required: {
      value: true,
      message: "Password is required",
    },
    minLength: {
      value: 6,
      message: "Password have at least 6 characters",
    },
    maxLength: {
      value: 32,
      message: "Password have at most 32 characters",
    },
  },
};

export const phoneValidation = {
  name: "phone",
  label: "phone",
  type: "text",
  id: "phone",
  placeholder: "Phone",
  validation: {
    required: {
      value: true,
      message: `Phone is required`,
    },
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: "Invalid phone number",
    },
  },
};

export const addressValidation = {
  name: "address",
  label: "address",
  type: "text",
  id: "address",
  placeholder: "Address",
  validation: {
    minLength: {
      value: 2,
      message: "Address have at least 2 characters",
    },
    maxLength: {
      value: 255,
      message: "Address have at most 255 characters",
    },
  },
};

export const passwordConfirmValidation = {
  name: "passwordConfirm",
  label: "passwordConfirm",
  type: "password",
  id: "passwordConfirm",
  placeholder: "Confirm Password",
  validation: {
    required: {
      value: true,
      message: "Confirm password is required",
    },
    validate: (value, values) => {
      return value === values.password || "Passwords do not match";
    },
  },
};

export const textValidation = {
  name: "text",
  label: "text",
  type: "text",
  id: "text",
  validation: {
    maxLength: {
      value: 255,
      message: "Text have at most 255 characters",
    },
  },
};
