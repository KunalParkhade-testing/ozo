import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-green-600 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <h1 className="text-white text-2xl font-bold">
                            🌱 OZO
                        </h1>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <Link 
                                    to="/" 
                                    className={`text-white hover:text-green-200 transition ${isActive('/') ? 'font-bold' : ''}`}
                                >
                                    Home
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link 
                                            to="/dashboard" 
                                            className={`text-white hover:text-green-200 transition ${isActive('/dashboard') ? 'font-bold' : ''}`}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-100 transition font-medium"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link 
                                            to="/login" 
                                            className="text-white hover:text-green-200 transition"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/signup" 
                                            className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-100 transition font-medium"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
