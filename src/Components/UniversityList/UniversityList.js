import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UniversityList.css";
import { FaInfoCircle, FaTrashAlt, FaGlobe, FaMapMarkerAlt, FaSearch, FaSort } from "react-icons/fa";

const UniversityList = ({ universities, onDelete }) => {
  const initialSearchTerm = localStorage.getItem("searchTerm") || "";
  const initialSortBy = localStorage.getItem("sortBy") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortBy, setSortBy] = useState(initialSortBy);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDelete = (name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmDelete) {
      onDelete(name);
    }
  };

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedUniversities = [...filteredUniversities];

  if (sortBy === "asc") {
    sortedUniversities.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "desc") {
    sortedUniversities.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="university-list-container">
      <h2 className="university-list-title" data-testid="university-list-title">
        University List
      </h2>

      <div className="filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="sort-container">
          <FaSort className="sort-icon" />
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="sort-select"
          >
            <option value="">Sort by</option>
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {sortedUniversities.length === 0 ? (
        <p className="no-results">No universities found.</p>
      ) : (
        <div className="university-card-grid">
          {sortedUniversities.map((university, index) => (
            <div key={index} className="university-card">
              <div className="university-card-inner">
                <div className="university-card-content">
                  <h3 className="university-name">{university.name}</h3>
                  <p className="university-location">
                    <FaMapMarkerAlt className="location-icon" />
                    {university.country}
                    {university.state_province && `, ${university.state_province}`}
                  </p>
                  <a
                    href={university.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="university-website"
                  >
                    <FaGlobe className="website-icon" /> Visit Website
                  </a>
                </div>
                <div className="university-card-actions">
                  <Link
                    to={`/university/${encodeURIComponent(university.name)}`}
                    className="view-button"
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(university.name)}
                    title="Delete"
                  >
                    <FaTrashAlt />
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

export default UniversityList;