import React, { useState } from 'react';

const GetReviews = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [reviews, setReviews] = useState([]);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setBookTitle(e.target.value);
    };

    const handleFetch = async (e) => {
        e.preventDefault();

        if (!bookTitle.trim()) {
            setMsg({ type: 'error', text: '❌ Please enter a book title.' });
            setReviews([]);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/lms/book/${bookTitle}/reviews`);
            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.message || 'Something went wrong';
                throw new Error(errorMessage);
            }

            if (data.length === 0) {
                setMsg({ type: 'error', text: '❌ No reviews found for this book.' });
            } else {
                setMsg({ type: 'success', text: `✅ Found ${data.length} review(s).` });
            }

            setReviews(data);
        } catch (err) {
            setMsg({ type: 'error', text: `❌ ${err.message}` });
            setReviews([]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-rose-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    View Book Reviews
                </h1>

                <form onSubmit={handleFetch} className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={handleChange}
                        placeholder="Enter Book Title"
                        className="flex-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        type="submit"
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                    >
                        Search
                    </button>
                </form>

                {msg.text && (
                    <div
                        className={`mb-6 text-center font-medium ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {msg.text}
                    </div>
                )}

                {reviews.length > 0 && (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-orange-50 p-4 rounded-lg border border-orange-200 shadow-sm"
                            >
                                <p className="text-orange-800 font-semibold mb-2">
                                    Rating: <span className="font-bold">{review.rating} ⭐</span>
                                </p>
                                <p className="text-gray-700">{review.comments}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetReviews;
