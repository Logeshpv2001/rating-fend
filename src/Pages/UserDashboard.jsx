import React, { useEffect, useState } from "react";
import apiClient from "../utilities/Axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const getData = async () => {
    try {
      const res = await apiClient.get("/api/user/stores");
      setStores(res);
      console.log(res, "data");
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleRating = async (storeId, rating) => {
    try {
      await apiClient.post("/api/user/rate", { storeId, rating });
      setStores((prev) =>
        prev.map((s) => (s.id === storeId ? { ...s, userRating: rating } : s))
      );
    } catch (error) {
      console.error("Error rating store:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {"data"}</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores?.map((store) => (
          <div key={store.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{store.name}</h3>
            <p className="text-gray-600">{store.address}</p>
            <p className="mt-2">Average Rating: {store.avgRating || "N/A"}</p>
            <p>Your Rating: {store.userRating || "Not rated yet"}</p>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRating(store.id, r)}
                  className={`px-2 py-1 rounded ${
                    store.userRating === r
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
