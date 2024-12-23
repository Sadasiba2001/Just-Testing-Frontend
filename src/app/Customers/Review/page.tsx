"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting.");
      return;
    }
    console.log({
      rating,
      comment,
    });
    alert("Thank you for your feedback!");
    setRating(0);
    setHover(0);
    setComment("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Review Your Experience
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please rate the support you received and share your feedback.
        </p>

        {/* Rating Section */}
        <div className="flex justify-center items-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer ${
                star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        {/* Comment Section */}
        <textarea
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Share your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
