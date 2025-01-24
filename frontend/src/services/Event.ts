import EventForm from '../components/EventForm.tsx';
import axios from 'axios';
import { API_URL } from '../lib/common/constant.ts';


export const onEventCreated = async (data: EventForm) => {
	try {
		const response = await axios.post(`${API_URL}/event`, data);
		return response.data;
	} catch (error) {
		console.error('Error fetching chat data:', error);
		throw error;
	}};
