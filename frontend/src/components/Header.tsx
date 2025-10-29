import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-green-500 p-4">
            <h1 className="text-white text-2xl">OZO — Our Zero-waste Option</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-white">Home</a></li>
                    <li><a href="/dashboard" className="text-white">Dashboard</a></li>
                    <li><a href="/about" className="text-white">About</a></li>
                    <li><a href="/contact" className="text-white">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;