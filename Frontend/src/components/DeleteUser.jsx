import React, { useState } from "react";

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!email) {
      setMsg({ type: "error", text: "❌ Please enter an email." });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/lms/user/${email}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data.message === "string"
            ? data.message.toLowerCase()
            : "";

        if (errorMessage.includes("not found") || res.status === 404) {
          setMsg({ type: "error", text: "❌ User does not exist." });
        } else {
          throw new Error("❌ Something went wrong.");
        }

        return;
      }

      setMsg({ type: "success", text: `🗑️ User deleted successfully!` });
      setEmail("");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "❌ Error occurred." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-rose-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
        <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
          🗑️ Delete User
        </h1>

        <form onSubmit={handleDelete} className="space-y-5">
          <div>
            <label className="block text-orange-700 font-semibold mb-1">
              Email (of user to delete)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
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
              msg.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteUser;
