import React, { useState } from "react";
import axios from "axios";
import "./SearchUser.css";

const SearchUser = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/users/search", {
        params: { name },
      });
      if (response.data.data.length === 0) {
        setMessage("No users found");
      } else {
        setMessage("");
      }
      setUsers(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("No users found");
      } else {
        console.error("Error searching users:", error);
        setMessage("An error occurred while searching for users");
      }
    }
  };

  return (
    <div className="search-user-container">
      <h1>Search Users</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user">
            {user.profilePicture && (
              <img src={user.profilePicture} alt="Profile" width="50" />
            )}
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
