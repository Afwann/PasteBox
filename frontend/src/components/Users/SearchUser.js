import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SearchUser.css";

const SearchUser = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users/search", {
        params: { name },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.data.length === 0) {
        setMessage("No users found");
      } else {
        setMessage("");
      }
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setMessage("An error occurred while searching for users");
    }
  };

  const handleReadMore = (userId) => {
    navigate(`/user/${userId}`);
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
            <button
              className={styles.readMoreBtn}
              onClick={() => handleReadMore(user._id)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
