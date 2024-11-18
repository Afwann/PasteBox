import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSnippet.module.css";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shared, setShared] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/snippets",
        { title, content, shared },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      setShared(false);
      setNotification("Snippet created successfully!");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSearchUserClick = () => {
    navigate("/search-user");
  };

  const handleSearchSnippetClick = () => {
    navigate("/search-snippet");
  };

  const handleMySnippetsClick = () => {
    navigate("/my-snippets");
  };

  return (
    <div className={styles.container}>
      <div className={styles.snippetsContainer}>
        <div className={styles.header}>
          <h1>PasteBox</h1>
          <div className={styles.headerLinks}>
            <span onClick={handleProfileClick} className={styles.headerLink}>
              Profile Management
            </span>
            <span onClick={handleSearchUserClick} className={styles.headerLink}>
              Search User
            </span>
            <span
              onClick={handleSearchSnippetClick}
              className={styles.headerLink}
            >
              Search Snippet
            </span>
            <span onClick={handleMySnippetsClick} className={styles.headerLink}>
              My Snippets
            </span>
          </div>
        </div>
        {notification && <p className={styles.notification}>{notification}</p>}
        <form onSubmit={handleSubmit} className={styles.snippetForm}>
          <h2>Create Snippet</h2>
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
              className={`${styles.sharedButton} ${
                shared ? styles.active : ""
              }`}
              onClick={() => setShared(true)}
            >
              Shared
            </button>
            <button
              type="button"
              className={`${styles.sharedButton} ${
                !shared ? styles.active : ""
              }`}
              onClick={() => setShared(false)}
            >
              Not Shared
            </button>
          </div>
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippet;
