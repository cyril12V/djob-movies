import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import CustomPagination from './components/Pagination';
import { movies$ } from './movies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);

  useEffect(() => {
    movies$.then(data => {
      const initializedMovies = data.map(movie => ({ ...movie, userReacted: null }));
      setMovies(initializedMovies);
      setFilteredMovies(initializedMovies);
      setCategories([...new Set(data.map(movie => movie.category))]);
    });
  }, []);

  const handleDelete = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    applyFilters(updatedMovies, selectedCategories);
  };

  const handleLike = (id) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === id) {
        if (movie.userReacted === 'like') {
          return { ...movie, likes: movie.likes - 1, userReacted: null };
        } else if (movie.userReacted === 'dislike') {
          return { ...movie, likes: movie.likes + 1, dislikes: movie.dislikes - 1, userReacted: 'like' };
        } else {
          return { ...movie, likes: movie.likes + 1, userReacted: 'like' };
        }
      }
      return movie;
    });
    setMovies(updatedMovies);
    applyFilters(updatedMovies, selectedCategories);
  };

  const handleDislike = (id) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === id) {
        if (movie.userReacted === 'dislike') {
          return { ...movie, dislikes: movie.dislikes - 1, userReacted: null };
        } else if (movie.userReacted === 'like') {
          return { ...movie, dislikes: movie.dislikes + 1, likes: movie.likes - 1, userReacted: 'dislike' };
        } else {
          return { ...movie, dislikes: movie.dislikes + 1, userReacted: 'dislike' };
        }
      }
      return movie;
    });
    setMovies(updatedMovies);
    applyFilters(updatedMovies, selectedCategories);
  };

  const applyFilters = (movies, selectedCategories) => {
    let filtered = movies;
    
    if (selectedCategories.length > 0) {
      filtered = movies.filter(movie => selectedCategories.includes(movie.category));
    }

    const remainingCategories = [...new Set(movies.map(movie => movie.category))];
    
    setFilteredMovies(filtered);
    setCategories(remainingCategories);
  };

  const handleFilterChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
    applyFilters(movies, selectedCategories);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMoviesPerPageChange = (number) => {
    setMoviesPerPage(number);
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="container mt-4">
      <Filter 
        categories={categories} 
        selectedCategories={selectedCategories} 
        onFilterChange={handleFilterChange} 
      />
      <MovieList 
        movies={currentMovies} 
        onDelete={handleDelete} 
        onLike={handleLike} 
        onDislike={handleDislike} 
      />
      <CustomPagination 
        totalMovies={filteredMovies.length} 
        moviesPerPage={moviesPerPage} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onMoviesPerPageChange={handleMoviesPerPageChange} 
      />
    </div>
  );
};

export default App;
