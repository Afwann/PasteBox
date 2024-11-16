import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Snippets.module.css";

const MySnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/snippets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnippets(response.data.data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };

    fetchSnippets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnippets(snippets.filter((snippet) => snippet._id !== id));
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-snippet/${id}`);
  };

  return (
    <div className={styles.mySnippetsContainer}>
      <h1>My Snippets</h1>
      <div className={styles.snippetsList}>
        {snippets.map((snippet) => (
          <div key={snippet._id} className={styles.snippet}>
            <h3>{snippet.title}</h3>
            <p>{snippet.content}</p>
            <p className={styles.snippetId}>ID: {snippet._id}</p>
            <p className={styles.sharedStatus}>
              {snippet.shared ? "Shared" : "Not Shared"}
            </p>
            <div className={styles.snippetButtons}>
              <button
                className={styles.updateButton}
                onClick={() => handleUpdate(snippet._id)}
              >
                Update
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(snippet._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySnippets;
