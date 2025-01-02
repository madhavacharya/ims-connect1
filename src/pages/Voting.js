import React, { useEffect, useState } from "react";
import { db, auth } from "../config/Firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const VoteIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false); // To handle voting state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const fetchIdeas = async () => {
      try {
        const data = await getDocs(collection(db, "submit data"));
        const fetchedIdeas = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          votedBy: doc.data().votedBy || [], // Default to an empty array if undefined
        }));
        setIdeas(fetchedIdeas);
      } catch (err) {
        console.error("Error fetching ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleVote = async (id, currentVotes, votedBy) => {
    if (!user) {
      alert("You must be logged in to vote!");
      return;
    }

    if (voting) {
      alert("Voting is in progress. Please wait...");
      return;
    }

    if (votedBy.includes(user.uid)) {
      alert("You have already voted for this idea!");
      return;
    }

    setVoting(true); // Start voting process

    try {
      const ideaRef = doc(db, "submit data", id);
      await updateDoc(ideaRef, {
        votes: currentVotes + 1,
        votedBy: arrayUnion(user.uid),
      });

      // Update local state to reflect the new vote
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === id
            ? {
                ...idea,
                votes: (idea.votes || 0) + 1,
                votedBy: [...(idea.votedBy || []), user.uid],
              }
            : idea
        )
      );
    } catch (err) {
      console.error("Error voting for idea:", err);
      alert("An error occurred while voting. Please try again.");
    } finally {
      setVoting(false); // Reset voting state
    }
  };

  const topIdeas = [...ideas].sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Vote for Your Favorite Idea</h1>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : ideas.length === 0 ? (
        <p className="text-center text-muted">No ideas available for voting.</p>
      ) : (
        <>
          {/* Display Ideas for Voting */}
          <div className="row">
            {ideas.map((idea) => (
              <div key={idea.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{idea.idea}</h5>
                    <p className="card-text">{idea.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className={`btn ${
                          user && idea.votedBy.includes(user.uid)
                            ? "btn-secondary"
                            : "btn-success"
                        } w-50`}
                        onClick={() => handleVote(idea.id, idea.votes || 0, idea.votedBy || [])}
                        disabled={voting || (user && idea.votedBy.includes(user.uid))}
                      >
                        {user && idea.votedBy.includes(user.uid) ? "Voted" : `Vote (${idea.votes || 0})`}
                      </button>
                      <small className="text-muted">
                        {idea.createdAt
                          ? new Date(idea.createdAt.seconds * 1000).toLocaleDateString()
                          : "N/A"}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Ideas Section */}
          <h2 className="text-center mt-5">Top Ideas</h2>
          {topIdeas.length > 0 ? (
            <div className="row mt-4">
              {topIdeas.slice(0, 3).map((idea) => (
                <div key={idea.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-success shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">{idea.idea}</h5>
                      <p className="card-text">{idea.description}</p>
                      <p className="text-success fw-bold">Votes: {idea.votes || 0}</p>
                      <small className="text-muted">
                        {idea.createdAt
                          ? new Date(idea.createdAt.seconds * 1000).toLocaleDateString()
                          : "N/A"}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No top ideas to display yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default VoteIdea;
