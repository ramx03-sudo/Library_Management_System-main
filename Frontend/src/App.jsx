import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AddUser from './components/AddUser';
import FetchUser from './components/FetchUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import AddAuthorBook from './components/AddAuthorBook';
import AddReview from './components/AddReview';
import GetReviews from './components/GetReviews';
import DeleteBook from './components/DeleteBook';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/fetch-user" element={<FetchUser />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/add-author-book" element={<AddAuthorBook />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/reviews" element={<GetReviews />} />
        <Route path="/delete-book" element={<DeleteBook />} />
        
        {/* Optional: 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center text-2xl text-red-600 font-bold">
            404 - Page Not Found
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
