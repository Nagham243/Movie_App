import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";

export default function Search({ searchQuery, setSearchQuery, resetSearch }) {
  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="input-group w-50">
        <span className="input-group-text bg-dark text-white">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="btn btn-danger" onClick={resetSearch}>
            <FontAwesomeIcon icon={faUndo} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
