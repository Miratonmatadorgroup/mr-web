import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from '@/store/useUserStore';
import { CookieName } from '@/lib/api';
import { Roles } from '@/types/auth';

interface TokenPayload {
    role: Roles;
    exp: number;
    [key: string]: any;
}

const decodeToken = (token: string): TokenPayload | null => {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

interface AuthRoutesProps {
    children: React.ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
    const navigate = useNavigate();
    const setUserProfile = useUserStore((state) => state.setUser);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get(CookieName);

            if (!token) {
                handleUnauthenticated();
                return;
            }

            const decodedToken = decodeToken(token);
            if (!decodedToken || decodedToken.role === 'admin') {
                handleUnauthenticated();
                return;
            }

            //  Set as authenticated if everything checks out
            
            setIsAuthenticated(true);
        };

        const handleUnauthenticated = () => {
            setIsAuthenticated(false);
            setUserProfile(null);
            navigate('/signin');
        };

        checkAuth();
    }, [navigate, setUserProfile]);


    return isAuthenticated ? <>{children}</> : null;
};

export default AuthRoutes;
