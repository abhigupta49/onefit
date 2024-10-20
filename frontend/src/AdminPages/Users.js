import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({ name: '', email: '', phone: '' });

  // Dummy user data
  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567' },
    ]);
  }, []);

  const handleAddUser = () => {
    const newUserData = { id: users.length + 1, ...newUser };
    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '', phone: '' });
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUserId(id);
    setEditingUserData(userToEdit);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, ...editingUserData } : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
    setEditingUserData({ name: '', email: '', phone: '' });
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      {/* Add User Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Add New User</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded">
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">User ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-4">{user.id}</td>
                <td className="p-4">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editingUserData.name}
                      onChange={(e) => setEditingUserData({ ...editingUserData, name: e.target.value })}
                      className="border p-2 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-4">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={editingUserData.email}
                      onChange={(e) => setEditingUserData({ ...editingUserData, email: e.target.value })}
                      className="border p-2 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-4">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editingUserData.phone}
                      onChange={(e) => setEditingUserData({ ...editingUserData, phone: e.target.value })}
                      className="border p-2 rounded"
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  {editingUserId === user.id ? (
                    <button onClick={handleUpdateUser} className="bg-green-500 text-white p-2 rounded">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEditUser(user.id)} className="bg-yellow-500 text-white p-2 rounded">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
