import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from '../Components/PageHeader';
import Recipe from '../Components/Recipe';
import { Combobox } from 'react-widgets/cjs';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
     const [recipes, setRecipes] = useState([]);
     const [nationality, setNationality] = useState("");
     const [sortBy, setSortBy] = useState("");
     const navigate = useNavigate();

     useEffect(() => {
          fetch(`http://localhost:8080/recipes`)
               .then(response => response.json())
               .then(data => setRecipes(data))
               .catch(error => console.error('Error fetching recipes:', error));
     }, []);

     const generateRandomRecipe = () =>{
          let random;
          fetch(`http://localhost:8080/recipes/random`)
               .then(response => response.json())
               .then(data => {random = data})
               .catch(error => console.error('Error fetching recipes:', error));
          
          navigate(`/${random.recipeId}`)
     }

     const handleRecipesList = (recipeId) => {
          navigate(`/recipes/${recipeId.recipeId}`);
     };

     return (
          <div>
               <PageHeader />
               <div className="container">
                    <div>
                         <Combobox 
                         value={nationality}
                         data={["Chinese", "Canadian"]}
                         onChange={(nextValue) => setNationality(nextValue)}
                         />
                         <select
                              className="custom-select"
                              id="sortSelect"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              >
                              <option value="">hi</option>
                              <option value="lowToHigh">by</option>
                         </select>

                         <input type='button' value={"Random Recipe"} onClick={generateRandomRecipe}/>
                    </div>

                    {recipes.map(recipe => (
                         <div onClick={() => handleRecipesList(recipe)} className="recipe-card">
                         <Recipe
                         recipe={recipe}/>
                         </div>
                    ))}
               </div>
          </div>
     );
};
export default RecipeList;
