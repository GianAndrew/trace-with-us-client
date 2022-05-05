import { useAuth } from '../auth/Authenticate';
import { axiosApi } from '../api/serverApi';

export const useAccessToken = () => {
	const { auth } = useAuth();

	const accessToken = async () => {
		try {
			const { data } = await axiosApi.get('/auth/visitors', { headers: { Authorization: 'Bearer ' + auth.accessToken } });
			return data;
		} catch (error) {
			return error.response?.data?.msg;
		}
	};
	return accessToken;
};
