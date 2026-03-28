export const normalizeRegisterInput = (data) => {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    password: data.password,
    role: data.role?.trim().toLowerCase(),
  };
};


export const normalizeLoginInput = (data) => { 
  return {
    email: data.email?.trim().toLowerCase(),
    password: data.password?.trim(),
  };
}