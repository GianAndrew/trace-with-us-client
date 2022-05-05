import { useAuth } from '../auth/Authenticate';
import { axiosApi } from '../api/serverApi';
import jwtDecode from 'jwt-decode';

export const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();

	const refresh = async () => {
		try {
			let currentTime = new Date();
			const decodedToken = jwtDecode(auth.accessToken);
			if (decodedToken.exp * 1000 < currentTime.getTime()) {
				const response = await axiosApi.post('/refresh', { token: auth.refreshToken });
				localStorage.setItem('user', JSON.stringify({ ...auth, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
				setAuth({ ...auth, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
				return response.data.accessToken;
			}
			return auth;
		} catch (error) {
			return error?.response?.data;
		}
	};
	return refresh;
};
