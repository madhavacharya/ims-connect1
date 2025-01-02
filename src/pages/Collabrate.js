import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase"; // Import Firebase config
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const Collabrate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  // Modal state
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // New Team/Project State
  const [newTeam, setNewTeam] = useState({ name: "", description: "", members: "" });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    type: "individual",
  });

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const teamsRef = collection(db, "teams");

        const [projectsSnap, teamsSnap] = await Promise.all([
          getDocs(projectsRef),
          getDocs(teamsRef),
        ]);

        const projects = projectsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const teams = teamsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setProjects(projects);
        setFilteredProjects(projects);
        setTeams(teams);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter projects based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    console.log(`Region selected: ${region}`);
  };
  
  // Use it in your map area
  <area
    target=""
    alt="North America"
    title="North America"
    href="#"
    coords="211,137,207,189,248,239,282,248,312,261,333,303,293,343,249,301,236,249,202,220,169,173"
    shape="poly"
    onClick={(e) => {
      e.preventDefault(); // Prevent default navigation behavior
      handleRegionSelect("North America");
    }}
  />  

  const handleCreateTeam = async () => {
    try {
      const teamsRef = collection(db, "teams");
      await addDoc(teamsRef, {
        ...newTeam,
        members: newTeam.members.split(",").map((member) => member.trim()),
        timestamp: Timestamp.now(),
      });
      setTeams([...teams, newTeam]);
      alert("Team created successfully!");
      setShowTeamModal(false);
      setNewTeam({ name: "", description: "", members: "" });
    } catch (err) {
      console.error("Error creating team:", err);
      alert("Failed to create the team.");
    }
  };

  const handleCreateProject = async () => {
    try {
      const projectsRef = collection(db, "projects");
      await addDoc(projectsRef, {
        ...newProject,
        timestamp: Timestamp.now(),
      });
      setProjects([...projects, newProject]);
      alert("Project created successfully!");
      setShowProjectModal(false);
      setNewProject({ title: "", description: "", type: "individual" });
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create the project.");
    }
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4 fw-bold text-white">Advanced Collaboration Hub</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <label htmlFor="searchProjects" className="form-label text-white">
            Search Projects
          </label>
          <input
            type="text"
            className="form-control"
            id="searchProjects"
            placeholder="Type to search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Region Selection Button */}
        <div className="mb-4">
          <button className="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#regionModal">
            Select Your Region
          </button>
        </div>

        {/* Region Display */}
        {selectedRegion && (
          <div className="alert alert-info text-center" role="alert">
            Selected Region: {selectedRegion}
          </div>
        )}

        {/* Actions */}
        <div className="d-flex justify-content-between mb-4">
          <button
            className="btn btn-success"
            onClick={() => setShowTeamModal(true)}
          >
            Create Team
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowProjectModal(true)}
          >
            Create Project
          </button>
        </div>

        {/* Project List */}
        <div className="row">
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <span className={`badge bg-${project.type === "individual" ? "primary" : "success"}`}>
                    {project.type === "individual" ? "Individual" : "Group"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Modal */}
      {showTeamModal && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Team</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTeamModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Team Name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Team Description"
                  rows="3"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                ></textarea>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Team Members (comma-separated)"
                  value={newTeam.members}
                  onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowTeamModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleCreateTeam}>
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProjectModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Project Description"
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                ></textarea>
                <select
                  className="form-select"
                  value={newProject.type}
                  onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowProjectModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateProject}>
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collabrate;
