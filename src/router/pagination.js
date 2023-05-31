import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    const handlePreviousClick = () => {
      onPageChange(currentPage - 1);
    };
  
    const handleNextClick = () => {
      onPageChange(currentPage + 1);
    };
  
    return (
      <div>
        <button onClick={handlePreviousClick} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }

