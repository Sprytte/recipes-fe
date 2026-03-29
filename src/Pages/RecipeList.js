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
          fetch(`http://localhost:8000/api/recipes`)
               .then(response => response.json())
               .then(data => setRecipes(data.recipes))
               .catch(error => console.error('Error fetching recipes:', error));
     }, []);

     const generateRandomRecipe = () =>{
          fetch(`http://localhost:8000/api/recipes/random`)
               .then(response => response.json())
               .then(data => {
                    navigate(`/recipes/${data}`);
               })
               .catch(error => console.error('Error fetching recipes:', error));
     
     }

     const handleRecipesList = (recipeId) => {
          navigate(`/recipes/${recipeId.id}`);
     };

     return (
          <div>
               <PageHeader />
               <div className='home-pizzaazz'>
                         <img src='https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo=' alt='home decor 1'></img>
                         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VTBIGdOL1ZFQ6qBixFnd4LNpJFZ_N4MM4g&s' alt='home decor 2'></img>
                         <p>A simple collection of easy, tasty recipes to enjoy anytime.</p>
                    </div>
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

                    {recipes && recipes.map(recipe => (
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
