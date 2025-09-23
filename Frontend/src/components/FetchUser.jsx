import React, { useState } from 'react';

const FetchUser = () => {
    const [data, setData] = useState(null);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage("");  // clear error when typing again
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/lms/user/${email}`);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const result = await response.json();
            console.log("User Data:", result);
            setData(result);
            setErrorMessage("");
            setEmail("");
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setData(null);
            setErrorMessage("❌ User does not exist or could not be fetched.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchUserData();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-rose-100 p-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    📧 Fetch User Data by Email
                </h1>

                <div className="flex items-center gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter email address..."
                        className="flex-grow px-4 py-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        onClick={fetchUserData}
                        className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition duration-200 shadow-md hover:cursor-pointer"
                    >
                        Fetch
                    </button>
                </div>

                {/* Error message display */}
                {errorMessage && (
                    <div className="mt-4 text-center text-red-600 font-semibold bg-red-50 border border-red-300 rounded-md py-2 px-4">
                        {errorMessage}
                    </div>
                )}

                {/* User data display */}
                {data && (
                    <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6 shadow-inner">
                        <h2 className="text-xl font-semibold text-orange-700 mb-4">👤 User Details</h2>
                        <div className="space-y-2 text-orange-800">
                            <p><span className="font-bold">Name:</span> {data.name}</p>
                            <p><span className="font-bold">Email:</span> {data.email}</p>
                            <p><span className="font-bold">User ID:</span> {data.id}</p>

                            <div className="mt-4">
                                <h3 className="font-semibold text-orange-600">🎫 Library Card Info</h3>
                                <p><span className="font-bold">Card ID:</span> {data.libraryCardsDTO.id}</p>
                                <p><span className="font-bold">Issue Date:</span> {data.libraryCardsDTO.issueDate}</p>
                                <p><span className="font-bold">Expiry Date:</span> {data.libraryCardsDTO.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FetchUser;
