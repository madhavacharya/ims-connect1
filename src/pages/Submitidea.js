import React, { useState } from "react";
import { db } from "../config/Firebase";
import { collection, addDoc } from "firebase/firestore";


const Submitidea = () => {
  const [idea, setIdea] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const ideaCollection = collection(db, "submit data");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new document to Firestore
      await addDoc(ideaCollection, {
        idea,
        description,
        createdAt: new Date(),
      });
      setMessage("Idea submitted successfully!");
      setIdea(""); // Reset input fields
      setDescription("");
    } catch (err) {
      console.error("Error submitting idea:", err);
      setMessage("Error submitting idea. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Submit Your Idea</h1>
      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="idea" className="form-label">
            Idea Title:
          </label>
          <input
            type="text"
            id="idea"
            className="form-control"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your idea title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of your idea"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default Submitidea;
