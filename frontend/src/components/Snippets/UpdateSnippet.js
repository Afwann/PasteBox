import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Snippets.module.css";

const UpdateSnippet = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shared, setShared] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/snippets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const snippet = response.data.data;
        setTitle(snippet.title);
        setContent(snippet.content);
        setShared(snippet.shared);
      } catch (error) {
        console.error("Error fetching snippet:", error);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/snippets/${id}`,
        { title, content, shared },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification("Snippet updated successfully!");
      setTimeout(() => {
        setNotification("");
        navigate("/my-snippets");
      }, 3000); // Clear notification after 3 seconds and navigate back to My Snippets
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  return (
    <div className={styles.snippetsContainer}>
      <div className={styles.header}>
        <h1>Update Snippet</h1>
      </div>
      {notification && <p className={styles.notification}>{notification}</p>}
      <form onSubmit={handleSubmit} className={styles.snippetForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.sharedButtons}>
          <button
            type="button"
            className={`${styles.sharedButton} ${shared ? styles.active : ""}`}
            onClick={() => setShared(true)}
          >
            Shared
          </button>
          <button
            type="button"
            className={`${styles.sharedButton} ${!shared ? styles.active : ""}`}
            onClick={() => setShared(false)}
          >
            Not Shared
          </button>
        </div>
        <button className={styles.updateSnippetBtn} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateSnippet;
