import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type User = {
  userId: string;
  jobRole?: string;
  skills?: string[];
  location?: string;
};

export const createUser = async ({ userId, jobRole, skills, location }: User): Promise<User> => {
  const result = await axios.post(`${API_URL}/api/user/create`, {
    userId,
    jobRole,
    skills,
    location,
  });
  return result.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const result = await axios.get(`${API_URL}/api/user/get-user/${userId}`);
  return result.data;
};

export const updateUser = async ({ userId, jobRole, skills, location }: User): Promise<User> => {
  const result = await axios.put(`${API_URL}/api/user/update`, {
    userId,
    jobRole,
    skills,
    location,
  });
  return result.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/api/user/delete`, { data: { userId } });
};
