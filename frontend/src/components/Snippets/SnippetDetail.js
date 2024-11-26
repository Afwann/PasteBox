import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SnippetDetail.css";

const SnippetDetailPage = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    const fetchSnippetDetails = async () => {
      try {
        const response = await axios.get(`/api/snippets/shared/${id}`);
        setSnippet(response.data.data);
      } catch (error) {
        console.error("Error fetching snippet details:", error);
      }
    };

    fetchSnippetDetails();
  }, [id]);

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snippet-detail-container">
      <h2>Snippet Details</h2>
      <h3>{snippet.title}</h3>
      <p>{snippet.content}</p>
      <p>
        <strong>Author:</strong> {snippet.user.username}
      </p>
    </div>
  );
};

export default SnippetDetailPage;
