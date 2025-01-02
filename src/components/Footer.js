import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div class="container">
    <footer class="py-4 my-4 border-top">
        <div class="row">
            <div class="col-12 col-md-4">
                <ul class="nav flex-column">
                    <li class="nav-item mb-2">
                        <Link to="#" class="nav-link px-0 text-secondary">Home</Link>
                    </li>
                    <li class="nav-item mb-2">
                        <Link to="#" class="nav-link px-0 text-secondary">Idea Submission</Link>
                    </li>
                    <li class="nav-item mb-2">
                        <Link to="#" class="nav-link px-0 text-secondary">Voting</Link>
                    </li>
                    <li class="nav-item mb-2">
                        <Link to="#" class="nav-link px-0 text-secondary">Rewards</Link>
                    </li>
                    <li class="nav-item mb-2">
                        <Link to="#" class="nav-link px-0 text-secondary">Feedbacks</Link>
                    </li>
                </ul>
            </div>

          
            <div class="col-12 col-md-4 text-center">
                <h5 class="text-secondary mb-3">Subscribe</h5>
                <form>
                    <div class="input-group">
                        <input type="email" class="form-control" placeholder="Your Email Address" required/>
                        <button class="btn btn-primary" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>

           
            <div class="col-12 col-md-4 text-center text-md-end">
                <h5 class="text-secondary mb-3">Follow Us</h5>
                <div>
                    <Link to="#" class="text-secondary me-3">
                        <i class="bi bi-facebook fs-4"></i>
                    </Link>
                    <Link to="#" class="text-secondary me-3">
                        <i class="bi bi-twitter fs-4"></i>
                    </Link>
                    <Link to="#" class="text-secondary me-3">
                        <i class="bi bi-linkedin fs-4"></i>
                    </Link>
                    <Link to="#" class="text-secondary">
                        <i class="bi bi-instagram fs-4"></i>
                    </Link>
                </div>
            </div>
        </div>

        <div class="row mt-4">
          
            <div class="col-12 text-center">
                <p class="text-secondary m-0">&copy; 2024 IMS-Connect. All rights reserved.</p>
                <small class="text-secondary">Made with <i class="bi bi-heart-fill text-danger"></i> by the IMS Team.</small>
            </div>
        </div>
    </footer>
</div>

    </>
  )
}

export default Footer