import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Bookmark = {
  userId: string;
  jobId: string;
  employer_name?: string;
  employer_logo?: string;
  job_title?: string;
};

export const createBookmark = async ({
  userId,
  jobId,
  employer_logo,
  employer_name,
  job_title,
}: Bookmark): Promise<Bookmark> => {
  const result = await axios.post(`${API_URL}/api/bookmark/create`, {
    userId: userId,
    jobId: jobId,
    employer_logo: employer_logo,
    employer_name: employer_name,
    job_title: job_title,
  });
  return result.data;
};

export const getAllBookmark = async (userId: string): Promise<Bookmark[]> => {
  const result = await axios.get(`${API_URL}/api/bookmark/get-bookmarks/${userId}`);
  return result.data;
};

export const deleteBookmark = async ({ userId, jobId }: Bookmark): Promise<void> => {
  await axios.delete(`${API_URL}/api/bookmark/delete`, { data: { userId: userId, jobId: jobId } });
};
