import React from 'react';

const MovieCard = ({ movie, onDelete, onLike, onDislike }) => {
  const likeRatio = (movie.likes + movie.dislikes > 0) ? 
    (movie.likes / (movie.likes + movie.dislikes)) * 100 : 0;

  return (
    <div className="card shadow-sm mb-4" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">{movie.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{movie.category}</h6>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${likeRatio}%` }}
            aria-valuenow={likeRatio}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="card-text">Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
        <button 
          className="btn btn-success w-100 mb-2" 
          onClick={() => onLike(movie.id)}>
          Like
        </button>
        <button 
          className="btn btn-warning w-100 mb-2" 
          onClick={() => onDislike(movie.id)}>
          Unlike
        </button>
        <button 
          className="btn btn-danger w-100" 
          onClick={() => onDelete(movie.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
