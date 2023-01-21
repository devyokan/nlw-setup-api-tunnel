import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://habits-api.loca.lt',
	headers: {
		'Bypass-Tunnel-Reminder': '',
	},
});
