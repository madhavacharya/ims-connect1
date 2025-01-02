import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className="container-fluid bg-light custom-nav">
        <header className="navbar navbar-expand-md navbar-light py-3 border-bottom shadow-sm">
            <div className="container">
                {/* Navbar Brand */}
                <Link to="/" className="navbar-brand fw-bold text-danger">IMS-Connect</Link>

                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="ideas" className="nav-link">Idea Submission</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="vote" className="nav-link">Voting</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="Reward" className="nav-link">Reward</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="collab" className="nav-link">Collabotaion Hub</Link>
                        </li>
                    </ul>

                    {/* Action Buttons */}
                    <div className="d-flex">
                        <Link to="login" className="btn btn-outline-primary me-2">Login</Link>
                        <Link to="signup" className="btn btn-success">Sign up</Link>
                    </div>
                </div>
            </div>
        </header>
    </div>
</>

  )
}

export default Header