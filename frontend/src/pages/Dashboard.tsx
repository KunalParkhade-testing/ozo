import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-4 text-lg">Welcome to the OZO Dashboard!</p>
            {/* Additional dashboard components and functionalities can be added here */}
        </div>
    );
};

export default Dashboard;