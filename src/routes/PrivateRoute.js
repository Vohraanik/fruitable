import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { authChecked } from '../redux/slice/auth.slice';

function PrivateRoute(props) {
    const auth = true;

    const { isLogin } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                await dispatch(authChecked());
            } catch {
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuthState();
    }, [dispatch, navigate, isLogin]);

    if (loading) {
        return <div>Loading....</div>;
    }
    return (

        isLogin ? <Outlet /> : <Navigate to="/login" replace />

    );
}

export default PrivateRoute;