import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-green-700 mb-8">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Waste Reduced</h3>
                        <p className="text-3xl font-bold text-green-600">0 kg</p>
                        <p className="text-sm text-gray-500 mt-2">This month</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Items Recycled</h3>
                        <p className="text-3xl font-bold text-green-600">0</p>
                        <p className="text-sm text-gray-500 mt-2">This month</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">CO2 Saved</h3>
                        <p className="text-3xl font-bold text-green-600">0 kg</p>
                        <p className="text-sm text-gray-500 mt-2">This month</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
                    <p className="text-gray-600 mb-4">
                        Welcome to your OZO dashboard! Start tracking your waste reduction efforts and see your impact grow.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-600 p-4">
                        <p className="text-green-800">
                            💡 <strong>Tip:</strong> Begin by logging your daily waste and recycling activities to see your progress over time.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <p className="text-gray-500">No activities yet. Start your zero-waste journey today!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
