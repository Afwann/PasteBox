import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data.data;
        setProfile(data);
        setName(data.name);
        setBio(data.bio);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/profile/update",
        { name, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification("Profile updated successfully!");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/profile/upload-picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setNotification("Profile picture updated successfully!");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      <div className={styles.profileInfo}>
        <img
          src={profile.profilePicture}
          alt="Profile"
          className={styles.profilePicture}
        />
        <form onSubmit={handleProfilePictureUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <button className={styles.uploadBtn} type="submit">
            Upload Profile Picture
          </button>
        </form>
        <form onSubmit={handleProfileUpdate}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.profileInput}
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button className={styles.updateBtn} type="submit">
            Update Profile
          </button>
        </form>
        {notification && <p className={styles.notification}>{notification}</p>}
      </div>
    </div>
  );
};

export default Profile;
