import React, { useState } from "react";
import axios from "axios";
import "./SearchSnippet.css";

const SearchSnippet = () => {
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5555/api/snippets/search",
        {
          params: { title },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.data.length === 0) {
        setMessage("No snippets found");
      } else {
        setMessage("");
      }
      setSnippets(response.data.data);
    } catch (error) {
      console.error("Error searching snippets:", error);
      setMessage("An error occurred while searching for snippets");
    }
  };

  return (
    <div className="search-snippet-container">
      <h1>Search Snippets</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="snippets-list">
        {snippets.map((snippet) => (
          <div key={snippet._id} className="snippet">
            <h3>{snippet.title}</h3>
            <p>{snippet.content}</p>
            <p>User: {snippet.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSnippet;
