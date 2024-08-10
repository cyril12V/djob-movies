import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onDelete, onLike, onDislike }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onDelete={onDelete} 
          onLike={onLike} 
          onDislike={onDislike} 
        />
      ))}
    </div>
  );
};

export default MovieList;
