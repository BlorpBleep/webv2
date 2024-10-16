// utils/validation.ts

export const validateEmail = (email: string): boolean => {
  // Simple regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters, include uppercase, lowercase, number, and special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return re.test(password);
};
