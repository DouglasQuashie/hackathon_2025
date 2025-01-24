import axios from 'axios';
import { Chat } from '../lib/chat/interfaces/Chat.ts';
import { ApiResponse } from '../lib/common/ApiResponse.ts';
import { ZoneItem } from '../lib/chat/interfaces/Zone.ts';
import { API_URL } from '../lib/common/constant.ts';


export const getChatByZone = async (zone: string): Promise<ApiResponse<Chat[]>> => {
    try {
        const response = await axios.get(`${API_URL}/chat`, {
            params: { zone: zone }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat data:', error);
        throw error;
    }
};

export const getZones = async (): Promise<ApiResponse<ZoneItem[]>> => {
    try {
        const response = await axios.get(`${API_URL}/zone`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat data:', error);
        throw error;
    }
};

