import React, { useState } from 'react';

const UpdateUser = () => {
    const [email, setEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8080/api/lms/user/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: newName
            });

            const contentType = res.headers.get("content-type");
            const isJson = contentType && contentType.indexOf("application/json") !== -1;
            const data = isJson ? await res.json() : await res.text();

            if (!res.ok) {
                if (typeof data === 'string') {
                    throw new Error(data);
                } else {
                    throw new Error(data.message || "Something went wrong");
                }
            }

            setMsg({ type: 'success', text: `✅ Name updated successfully!` });
            setEmail('');
            setNewName('');
        } catch (err) {
            let errorText = err.message.includes("not found") || err.message.includes("exist")
                ? "❌ User does not exist"
                : `❌ ${err.message}`;
            setMsg({ type: 'error', text: errorText });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-rose-100 p-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">✏️ Update User Name</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-orange-700 font-semibold mb-1">Email (of user to update)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-orange-700 font-semibold mb-1">New Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="New Full Name"
                            required
                            className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md"
                    >
                        Update
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

export default UpdateUser;
