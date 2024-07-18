import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/UniversityDetail.css";
import { FaGlobeAmericas, FaMapMarkerAlt, FaLink, FaFlag, FaArrowLeft } from "react-icons/fa";

const UniversityDetail = ({ universities }) => {
  const { name } = useParams();
  const university = universities?.find(
    (uni) => uni?.name === decodeURIComponent(name)
  );

  if (!university) {
    return (
      <div className="university-detail-container">
        <div className="university-card">
          <h2>Oops!</h2>
          <p className="not-found-message">University not found</p>
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to List
          </Link>
        </div>
      </div>
    );
  }

  const { country, web_pages, alpha_two_code, state_province } = university;

  return (
    <div className="university-detail-container">
      <div className="university-card">
        <div className="university-card-content">
          <h1 className="university-name" data-testid="university-detail-name">
            {university.name}
          </h1>
          <p className="university-location">
            <FaMapMarkerAlt className="icon" />
            <span>{country}{state_province && `, ${state_province}`}</span>
          </p>
          <div className="detail-item">
            <FaGlobeAmericas className="icon" />
            <div className="detail-text">
              <p className="detail-label">Country</p>
              <p className="detail-value">{country}</p>
            </div>
          </div>
          {state_province && (
            <div className="detail-item">
              <FaMapMarkerAlt className="icon" />
              <div className="detail-text">
                <p className="detail-label">State/Province</p>
                <p className="detail-value">{state_province}</p>
              </div>
            </div>
          )}
          <div className="detail-item">
            <FaLink className="icon" />
            <div className="detail-text">
              <p className="detail-label">Website</p>
              <a
                className="university-website"
                href={web_pages[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          </div>
          <div className="detail-item">
            <FaFlag className="icon" />
            <div className="detail-text">
              <p className="detail-label">Alpha Two Code</p>
              <p className="detail-value">{alpha_two_code}</p>
            </div>
          </div>
        </div>
        <div className="university-card-actions">
          <Link to="/" className="back-link">
            <FaArrowLeft /> <span>Back to List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;