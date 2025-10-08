import { Outlet, useNavigate } from 'react-router-dom';
import { Auth } from '../../constants';
import { useEffect } from 'react';

export const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const token = Auth.token;

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return token && <Outlet />;
};
