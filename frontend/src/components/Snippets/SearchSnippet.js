import React, { useState } from "react";
import axios from "axios";
import styles from "./Snippets.module.css";

const SearchSnippet = () => {
  const [search, setSearch] = useState("");
  const [snippets, setSnippets] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/snippets/search", {
        params: { search },
      });
      setSnippets(response.data.data);
    } catch (error) {
      console.error("Error searching snippets:", error);
    }
  };

  return (
    <div className={styles.searchSnippetContainer}>
      <h1>Search Snippets</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles.snippetsList}>
        {snippets.map((snippet) => (
          <div key={snippet._id} className={styles.snippet}>
            <h3>{snippet.title}</h3>
            <p>User: {snippet.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSnippet;
