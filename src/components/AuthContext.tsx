import React, {useEffect, useRef, useState} from "react";
import {
    /* useLocation,*/
    Navigate, useNavigate
} from 'react-router-dom';
import { AccessTokenContext } from "../AccessTokenContext";
import {useAuth} from "../useAuth.tsx";
export interface AccessToken {
    expiry: number|null;
    onLogin: (email:string, password:string)=> void;
    onLogout: () => void;
}

const ACCESS_TOKEN_EXPIRY = 360000;
export const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children })  => {
    const [tokenExpiry, setTokenExpiry] = useState<number | null>(localStorage.getItem('tokenExpiry') ? JSON.parse(localStorage.getItem('tokenExpiry') as string) : null);
    const intervalRef = useRef<ReturnType<typeof setInterval>>();
    const navigate = useNavigate();
    //const location = useLocation();
    const login = (email:string, password:string) => {
        if (email === 'test' && password === 'test') {
            const expiryTime = Date.now() + ACCESS_TOKEN_EXPIRY;
            setTokenExpiry(expiryTime);
            navigate('/SearchAndFilter');
            return true;
        }
        return false;
    };

    const logout = () => {
        setTokenExpiry(null);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        localStorage.removeItem("tokenExpiry");
        navigate('/');
    };
    useEffect(() => {
        if (tokenExpiry) {
            localStorage.setItem("tokenExpiry", JSON.stringify(tokenExpiry));
        } else {
            localStorage.removeItem("tokenExpiry");
        }
    }, [tokenExpiry]);
    useEffect(() => {
        const checkTokenExpiration = () => {
            const currentTime = Date.now();
            if (tokenExpiry && currentTime > tokenExpiry) {
                refreshAccessToken();
            }
        };
        checkTokenExpiration();
        intervalRef.current = setInterval(checkTokenExpiration, 60000);

        return () => clearInterval(intervalRef.current);
    }, [tokenExpiry]);
    const refreshAccessToken = () => {
        if (localStorage.getItem("rememberMe") == "true") {
            const newExpiryTime = Date.now() + ACCESS_TOKEN_EXPIRY;
            setTokenExpiry(newExpiryTime);
            localStorage.setItem("tokenExpiry", JSON.stringify(newExpiryTime));
        } else {
            localStorage.removeItem("tokenExpiry");
        }
    };

    return (
        <AccessTokenContext.Provider value={{ expiry:tokenExpiry, onLogin:login, onLogout:logout  }}>
            {children}
        </AccessTokenContext.Provider>
    );
};
export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { expiry } = useAuth();

    if (!expiry || (expiry && Date.now() > expiry)) {
        return <Navigate to="/" replace />;
    }

    return children;
};
