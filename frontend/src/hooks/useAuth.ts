import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setUser(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await fetch('/api/v1/auth/logout', {
                method: 'POST',
            });
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/v1/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error, login, logout };
};

export default useAuth;