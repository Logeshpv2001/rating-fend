import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = ({ user, setUser }) => {
  const [stats, setStats] = useState({});
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, storesRes, usersRes] = await Promise.all([
          axios.get("/api/admin/stats"),
          axios.get("/api/admin/stores"),
          axios.get("/api/admin/users"),
        ]);
        setStats(statsRes.data);
        setStores(storesRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Stores</h2>
          <p className="text-xl">{stats.totalStores}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Ratings</h2>
          <p className="text-xl">{stats.totalRatings}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Registered Stores</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-t">
                <td className="p-2">{store.name}</td>
                <td className="p-2">{store.email}</td>
                <td className="p-2">{store.address}</td>
                <td className="p-2">{store.rating || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mb-2">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.address}</td>
                <td className="p-2 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
