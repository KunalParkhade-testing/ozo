import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-green-600">OZO — Our Zero-waste Option</h1>
            <p className="mt-4 text-lg text-center text-gray-700">
                Welcome to OZO, where we are committed to reducing waste and promoting sustainable living.
            </p>
            <div className="mt-8">
                <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Home;