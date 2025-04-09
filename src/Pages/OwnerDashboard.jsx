import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerDashboard = ({ user, setUser }) => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(null);

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const [ratingsRes, avgRes] = await Promise.all([
          axios.get("/api/owner/ratings"),
          axios.get("/api/owner/average-rating"),
        ]);
        setRatings(ratingsRes.data);
        setAverage(avgRes.data.average);
      } catch (err) {
        console.error("Failed to fetch owner data", err);
      }
    };

    fetchOwnerData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Average Rating: {average ?? "N/A"}
        </h2>
      </div>

      <h2 className="text-xl font-bold mb-2">Ratings Submitted</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">User Name</th>
              <th className="p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{entry.userName}</td>
                <td className="p-2">{entry.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;
