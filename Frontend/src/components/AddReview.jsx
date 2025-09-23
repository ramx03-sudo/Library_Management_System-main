import React, { useState } from 'react';

const AddReview = () => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        rating: '',
        comments: '',
    });

    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { bookTitle, rating, comments } = formData;

        if (!bookTitle.trim() || !rating.trim() || !comments.trim()) {
            setMsg({ type: 'error', text: '❌ Please fill all fields.' });
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/lms/book/${formData.bookTitle}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    comments: formData.comments,
                    rating: parseFloat(formData.rating)
                }),
            });


            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.message || 'Something went wrong';
                throw new Error(errorMessage);
            }

            setMsg({ type: 'success', text: '✅ Review added successfully!' });
            setFormData({ bookTitle: '', rating: '', comments: '' });
        } catch (err) {
            setMsg({ type: 'error', text: `❌ ${err.message}` });
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-rose-100 p-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    Add Book Review
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="bookTitle" className="block text-orange-700 font-semibold mb-1">Book Title</label>
                        <input
                            type="text"
                            id="bookTitle"
                            name="bookTitle"
                            value={formData.bookTitle}
                            onChange={handleChange}
                            placeholder="Enter Book Title"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-orange-700 font-semibold mb-1">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            placeholder="Enter Rating (e.g. 4.5)"
                            step="0.1"
                            min="0"
                            max="5"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="comments" className="block text-orange-700 font-semibold mb-1">Comments</label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Write your review here..."
                            required
                            rows={5}
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                    >
                        Submit
                    </button>
                </form>

                {msg.text && (
                    <div
                        className={`mt-6 text-center font-medium ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddReview;
