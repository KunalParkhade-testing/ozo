import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold text-green-700 mb-6">
                    🌍 OZO — Our Zero-waste Option
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    Welcome to OZO, where we are committed to reducing waste and promoting sustainable living. 
                    Join our community to track your progress, find sustainable products, and make a real difference.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    {isLoggedIn ? (
                        <Link 
                            to="/dashboard"
                            className="px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition shadow-lg"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link 
                                to="/signup"
                                className="px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition shadow-lg"
                            >
                                Get Started
                            </Link>
                            <Link 
                                to="/login"
                                className="px-8 py-3 bg-white text-green-600 text-lg rounded-lg hover:bg-green-50 transition shadow-lg border-2 border-green-600"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">♻️</div>
                        <h3 className="text-xl font-bold text-green-700 mb-2">Track Your Impact</h3>
                        <p className="text-gray-600">Monitor your waste reduction efforts and see your positive impact on the environment.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🛍️</div>
                        <h3 className="text-xl font-bold text-green-700 mb-2">Find Products</h3>
                        <p className="text-gray-600">Discover sustainable products and alternatives to reduce your environmental footprint.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-bold text-green-700 mb-2">Join Community</h3>
                        <p className="text-gray-600">Connect with like-minded individuals committed to zero-waste living.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
