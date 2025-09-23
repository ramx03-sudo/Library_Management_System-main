import React, { useState } from 'react';

const DeleteBook = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setBookTitle(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!bookTitle.trim()) {
            setMsg({ type: 'error', text: '❌ Please enter a book title.' });
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/lms/book/${bookTitle}/reviews`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.message || 'Something went wrong';
                throw new Error(errorMessage);
            }

            setMsg({ type: 'success', text: `✅ ${data.message}` });
            setBookTitle('');
        } catch (err) {
            setMsg({ type: 'error', text: `❌ ${err.message}` });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-rose-100 p-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    Delete Book and Reviews
                </h1>

                <form onSubmit={handleDelete} className="space-y-5">
                    <div>
                        <label htmlFor="bookTitle" className="block text-orange-700 font-semibold mb-1">
                            Book Title
                        </label>
                        <input
                            type="text"
                            id="bookTitle"
                            name="bookTitle"
                            value={bookTitle}
                            onChange={handleChange}
                            placeholder="Enter Book Title"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                    >
                        Delete
                    </button>
                </form>

                {msg.text && (
                    <div
                        className={`mt-6 text-center font-medium ${
                            msg.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteBook;
