import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ideaCollection = collection(db, "submit data");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const querySnapshot = await getDocs(ideaCollection);
        const ideasList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIdeas(ideasList);
      } catch (err) {
        console.error("Error fetching ideas:", err);
        setError("Failed to load ideas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h2>Loading ideas...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Ideas</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {ideas.length === 0 ? (
        <div className="alert alert-info text-center">No ideas available yet.</div>
      ) : (
        <div className="row">
          {ideas.map((idea) => (
            <div key={idea.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{idea.idea}</h5>
                  <p className="card-text text-muted">{idea.description}</p>
                  <p className="text-secondary small">
                    Submitted on:{" "}
                    {idea.createdAt
                      ? new Date(idea.createdAt.seconds * 1000).toLocaleDateString()
                      : "Unknown date"}
                  </p>
                  <button
                    onClick={() => navigate(`/ideas/${idea.id}`)}
                    className="btn btn-outline-primary w-100"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
