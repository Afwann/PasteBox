import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SearchSnippet.css";

const SearchSnippet = () => {
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/snippets/search/title", {
        params: { title },
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const handleReadMore = (snippetId) => {
    navigate(`/snippet/${snippetId}`);
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
            <div className={styles.snippetAuthorContainer}>
              <h3>{snippet.title}</h3>
              <h4>Author: {snippet.user.username}</h4>
            </div>
            <button onClick={() => handleReadMore(snippet._id)}>
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSnippet;
