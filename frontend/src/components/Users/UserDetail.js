import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UserDetail.css";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/profile/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail-container">
      <h1>User Details</h1>
      <img
        src={user.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
      <h2 id="username">
        <strong>{user.name}</strong>
      </h2>
      <h3 id={"bio"}>About Me</h3>
      <div className={"bioContainer"}>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default UserDetailPage;
