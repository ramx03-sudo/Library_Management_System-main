import React, { useState } from 'react';

const AddReview = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    reviewText: '',
  });

  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bookTitle.trim() || !formData.reviewText.trim()) {
      setMsg({ type: 'error', text: '❌ Please fill all fields.' });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/lms/reviews/add/${formData.bookTitle}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText: formData.reviewText }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setMsg({ type: 'success', text: '✅ Review added successfully!' });
      setFormData({ bookTitle: '', reviewText: '' });
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
            <label className="block text-orange-700 font-semibold mb-1">Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="Enter Book Title"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-orange-700 font-semibold mb-1">Review</label>
            <textarea
              name="reviewText"
              value={formData.reviewText}
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

export default AddReview;
