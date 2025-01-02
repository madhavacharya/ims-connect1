import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs } from "firebase/firestore";


const Reward = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const ideaCollection = collection(db, "submit data");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getDocs(ideaCollection);
        const fetchedIdeas = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setIdeas(fetchedIdeas);
      } catch (err) {
        console.error("Error fetching ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // Get top 5 ideas based on votes
  const topIdeas = [...ideas]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 5);

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-5">Top 5 Reward Winners</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : topIdeas.length === 0 ? (
        <p className="text-center text-muted">No reward winners yet.</p>
      ) : (
        <div className="row justify-content-center">
          {topIdeas.map((idea, index) => (
            <div key={idea.id} className="col-md-6 mb-4">
              <div className="card shadow-lg text-center">
                <div className="card-body">
                  <h2 className="card-title text-primary">{idea.idea}</h2>
                  <p className="card-text text-muted">
                    {idea.description || "No description provided."}
                  </p>
                  <div className="badge bg-success fs-4 px-3 py-2">
                    Total Votes: {idea.votes || 0}
                  </div>
                  <div className="mt-4">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Award Image"
                      className="rounded-circle mb-3"
                    />
                    <h4 className="fw-bold">{idea.author || "Anonymous"}</h4>
                    <p className="text-muted mb-0">
                      Submitted on:{" "}
                      {idea.createdAt
                        ? new Date(idea.createdAt.seconds * 1000).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <button className="btn btn-primary mt-3">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reward;
