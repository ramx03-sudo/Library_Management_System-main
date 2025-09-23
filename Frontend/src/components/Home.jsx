import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-rose-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
                <h1 className="text-4xl font-extrabold text-center text-orange-700 mb-6">📚 Library Management System</h1>

                <p className="text-lg text-gray-800 text-center mb-10">
                    Welcome to your personalized LMS Dashboard. Manage users, books, authors, reviews and more through a unified interface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                    <div className="bg-orange-50 rounded-xl p-5 shadow-sm">
                        <h2 className="text-xl font-semibold text-orange-600 mb-2">👤 User Management</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Add a new user</li>
                            <li>Fetch user and issue library card</li>
                            <li>Update user name</li>
                            <li>Delete user along with their library card</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-5 shadow-sm">
                        <h2 className="text-xl font-semibold text-yellow-600 mb-2">📖 Book & Author Management</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Add new author and book</li>
                            <li>Delete book along with its reviews</li>
                        </ul>
                    </div>

                    <div className="bg-rose-50 rounded-xl p-5 shadow-sm md:col-span-2">
                        <h2 className="text-xl font-semibold text-rose-600 mb-2">🌟 Review System</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Add a review to any book</li>
                            <li>View all book reviews</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-orange-500">Built with ❤️ using React & Tailwind CSS</p>
            </div>
        </div>
    );
};

export default Home;
