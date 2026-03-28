import validator from "validator";

export const validateRegisterInput = ({ name, email, password, role }) => {
  // Required fields
  if (!name || !email || !password || !role) {
    return "All fields are required";
  }

  // Name
  if (name.length < 2 || name.length > 100) {
    return "Name must be between 2 and 100 characters";
  }

  // Email
  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  // Password
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol";
  }

  // Role whitelist
  const allowedRoles = ["farmer", "buyer", "admin"];
  if (!allowedRoles.includes(role)) {
    return "Invalid role";
  }

  return null; // no error
};



export const validateLoginInput = ({ email, password }) => {
  // Required fields
  if (!email || !password) {
    return "Email and password are required";
  }

  // Email format
  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  return null;
};