import API from './api';

export const login = async (email: string, password: string) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (fullName: string, email: string, password: string, role = "ROLE_USER") => {
  const response = await API.post('/auth/register', {
    fullName,
    email,
    password,
    role,
  });
  return response.data;
};