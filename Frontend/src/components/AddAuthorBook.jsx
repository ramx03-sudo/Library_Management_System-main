import React, { useState } from 'react';

const AddAuthorBook = () => {
    const [authorName, setAuthorName] = useState('');
    const [books, setBooks] = useState([{ title: '' }]);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleBookChange = (index, e) => {
        const newBooks = [...books];
        newBooks[index].title = e.target.value;
        setBooks(newBooks);
    };

    const addBookField = () => {
        setBooks([...books, { title: '' }]);
    };

    const removeBookField = (index) => {
        if (books.length === 1) return;
        const newBooks = books.filter((_, i) => i !== index);
        setBooks(newBooks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = authorName.trim();
        const validBooks = books.map(book => ({ title: book.title.trim() }));

        const payload = {
            name: trimmedName,
            booksDTO: validBooks
        };

        try {
            const res = await fetch("http://localhost:8080/api/lms/author", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            setMsg({ type: 'success', text: '✅ Author and books added successfully!' });
            setAuthorName('');
            setBooks([{ title: '' }]);
        } catch (err) {
            setMsg({ type: 'error', text: `❌ ${err.message}` });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-rose-100 p-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">📚 Add Author & Their Books</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-orange-700 font-semibold mb-1">Author Name</label>
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Eg: John Smith"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-orange-700 font-semibold mb-1">Books</label>
                        {books.map((book, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={book.title}
                                    onChange={(e) => handleBookChange(index, e)}
                                    placeholder={`Book Title ${index + 1}`}
                                    required
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                {books.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeBookField(index)}
                                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                                    >
                                        ❌
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addBookField}
                            className="text-sm text-orange-700 underline hover:text-orange-900 mt-1"
                        >
                            + Add Another Book
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                    >
                        Submit
                    </button>
                </form>

                {msg.text && (
                    <div className={`mt-6 text-center font-medium ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAuthorBook;
