import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import Recipe from '../Components/Recipe';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, []);

  return (
    <div>
          <PageHeader />
          <div className="container">
               {recipe.name}
          </div>
    </div>
  );
};
export default RecipeDetails;
