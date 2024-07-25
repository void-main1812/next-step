import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Bookmark = {
    userId: string;
    jobId: string;
}

export const createBookmark = async ({userId, jobId}: Bookmark): Promise<Bookmark> => {
    const result = await axios.post(`${API_URL}/api/bookmark/create`, {
        userId: userId,
        jobId: jobId,
    });
    return result.data;
}

export const getAllBookmark = async (userId: string): Promise<Bookmark[]> => {
    const result = await axios.get(`${API_URL}/api/bookmark/get-bookmarks/${userId}`);
    return result.data;
}

export const deleteBookmark = async ({userId, jobId}: Bookmark): Promise<void> => {
    await axios.delete(`${API_URL}/api/bookmark/delete`, {data: {userId: userId, jobId: jobId}});
}