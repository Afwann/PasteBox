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
      <h2>User Details</h2>
      <img
        src={user.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
    </div>
  );
};

export default UserDetailPage;
