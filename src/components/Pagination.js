import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const CustomPagination = ({ totalMovies, moviesPerPage, currentPage, onPageChange, onMoviesPerPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <select className="form-select w-auto" onChange={(e) => onMoviesPerPageChange(Number(e.target.value))} value={moviesPerPage}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
      </select>
      <Pagination>
        <Pagination.Prev 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        {pageNumbers.map(number => (
          <Pagination.Item 
            key={number} 
            active={number === currentPage} 
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === pageNumbers.length} 
        />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
