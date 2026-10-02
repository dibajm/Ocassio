// src/views/DashboardView.jsx
import { Link } from "react-router-dom";
import Navbar from "./NavbarView";
import FooterView from "./FooterView";
import "../styles/home.css";

const DashboardView = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="homepage-container">
        {/* Top Left: Text Section */}
        <div className="homepage-text">
          <h2>Events Made Easy, Memories Made Forever</h2>
          <p>
            Occasio is your AI-powered event planning assistant, making it effortless to organize gatherings of any size. From scheduling and guest management to personalized recommendations, we
            handle the details so you can focus on making unforgettable memories.
          </p>
          <Link to="/chatbot" className="cta-link">
            {" "}
            Plan your next event now →{" "}
          </Link>
        </div>

        {/* Top Right: Image */}
        <div className="homepage-image">
          <img src="/planner.png" alt="Planner notebook" />
        </div>

        {/* Bottom: How It Works */}
        <div className="homepage-how-it-works">
          <img src="/moodboard.png" alt="How it works" className="how-it-works-image" />
          <h3>How it Works</h3>
          <ol>
            <li>
              <strong> Plan Your Event:</strong> Enter event details and preferences.
            </li>
            <li>
              <strong> Get Recommendations:</strong> Receive personalized suggestions for venues, catering, and more.
            </li>
            <li>
              <strong> Create Custom Invitations</strong>
            </li>
            <li>
              <strong> Manage Guests:</strong> Send invites and track RSVPs effortlessly.
            </li>
          </ol>
        </div>
      </div>
      <FooterView></FooterView>
    </div>
  );
};

export default DashboardView;
