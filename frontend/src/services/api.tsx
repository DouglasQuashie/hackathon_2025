import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getChatByZone = async (zone: number) => {
    try {
        const response = await axios.get(`${API_URL}/chat`, {
            params: {
                zone: zone
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat data:', error);
        throw error;
    }
};