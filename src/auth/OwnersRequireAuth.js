import React from 'react';
import { useAuth } from '../auth/Authenticate';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const OwnersRequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();
	return auth?.id ? <Outlet /> : <Navigate to={'/owners/login'} state={{ from: location }} replace />;
};

export default OwnersRequireAuth;
