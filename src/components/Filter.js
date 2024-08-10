import React from 'react';

const Filter = ({ categories, selectedCategories, onFilterChange }) => {
  const handleChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category) ?
      selectedCategories.filter(c => c !== category) :
      [...selectedCategories, category];
    onFilterChange(newSelectedCategories);
  };

  return (
    <div className="filter">
      {categories.map(category => (
        <label key={category}>
          <input 
            type="checkbox" 
            checked={selectedCategories.includes(category)} 
            onChange={() => handleChange(category)} 
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default Filter;
