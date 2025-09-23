import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-orange-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-6">
                        {/* Dashboard Title */}
                        <Link to="/" className="text-xl font-bold tracking-wide">
                            📚 LMS Dashboard
                        </Link>

                        {/* POST Section */}
                        <div className="flex space-x-4 bg-orange-700 px-3 py-1 rounded-lg">
                            <Link
                                to="/add-user"
                                className="hover:bg-yellow-500 px-3 py-1 rounded transition"
                            >
                                Add User
                            </Link>
                            <Link
                                to="/add-author-book"
                                className="hover:bg-yellow-500 px-3 py-1 rounded transition"
                            >
                                Add Book
                            </Link>
                            <Link
                                to="/add-review"
                                className="hover:bg-yellow-500 px-3 py-1 rounded transition"
                            >
                                Add Review
                            </Link>
                        </div>

                        {/* Other Links */}
                        <div className="flex space-x-4">
                            <Link
                                to="/fetch-user"
                                className="hover:bg-orange-500 px-3 py-1 rounded transition"
                            >
                                Fetch User
                            </Link>
                            <Link
                                to="/update-user"
                                className="hover:bg-orange-500 px-3 py-1 rounded transition"
                            >
                                Update User
                            </Link>
                            <Link
                                to="/delete-user"
                                className="hover:bg-orange-500 px-3 py-1 rounded transition"
                            >
                                Delete User
                            </Link>
                            <Link
                                to="/reviews"
                                className="hover:bg-orange-500 px-3 py-1 rounded transition"
                            >
                                Reviews
                            </Link>
                            <Link
                                to="/delete-book"
                                className="hover:bg-orange-500 px-3 py-1 rounded transition"
                            >
                                Delete Book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
