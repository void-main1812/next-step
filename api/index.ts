import axios from "axios"

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface user {
    userId: string
}

export const createUser = async (userId: string): Promise<user> => {
    const result = await axios.post(`${API_URL}/api/user/create`, {userId: userId})
    return result.data
}