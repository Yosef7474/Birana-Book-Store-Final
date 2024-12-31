import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../redux/features/users/userApi";
import { AuthContext } from "../context/AuthContext";


const ProfilePage = () => {
  const {user } = useContext(AuthContext)

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState(user?.preference || "");

  const [updateProfile, { isLoading, isError, isSuccess, error }] = useUpdateProfileMutation(); // Use the hook

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPreference(user.preference);
    }
  }, [user]);

  const handleProfileUpdate = () => {
    const updatedProfile = {
      name,
      email,
      password,  // The password will be hashed on the server side
      preference,
    };

    updateProfile(updatedProfile); // Trigger the mutation
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Your Profile</h1>
      
      {isSuccess && <p className="text-green-500">Profile updated successfully!</p>}
      {isError && <p className="text-red-500">Failed to update profile: {error?.message}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="preference" className="block text-gray-700">Preference</label>
        <input
          id="preference"
          type="text"
          className="border p-2 w-full"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        className="bg-indigo-600 text-white px-6 py-2 rounded-full"
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
};

export default ProfilePage;
