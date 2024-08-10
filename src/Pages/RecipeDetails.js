import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import Recipe from '../Components/Recipe';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [portion, setPortion] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, []);
  useEffect(() => {
    setPortion(recipe.portion)
  }, []);
  
  // function getIngredientPortion

  return (
    <div>
          <PageHeader />
          <div className="container">
            <div className='recipe-details-header'>
              <div className='inner'>
                <img src="https://www.allrecipes.com/thmb/BKa1OqunLWMkCDJm_3LtxF_Pn88=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23600-worlds-best-lasagna-DDMFS-4x3-1196-24c5401652934ffb96d3d94bc9fbe2d7.jpg" width={200}/>
              </div>
              <div className='inner'>
                <h3>{recipe.name} </h3>
                <p>{recipe.cookTime} </p>
              </div>
              <div className='inner'>
                <p>{recipe.nationality} </p>
              </div>
            </div>
            <br/>
            <div>
              <Box sx={{ width: 300 }}>
              <Typography id="input-slider" gutterBottom style={{color: 'white'}}>
                Portion <br />
                {portion}
              </Typography>
                <Slider
                  className='slider-portion'
                  defaultValue={portion}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={(value) => setPortion(value.target.value)}
                  max={12}
                  // step={2}
                />
              </Box>
            </div>
          </div>

          <div className='recipe-note-card'>
            <h3>Ingredients</h3>
            {recipe && recipe.ingredients && recipe.ingredients.map((ingredient,nb) => (
              <p className='recipe-card-row'>
                {(nb+1)}.&nbsp;{(ingredient.split("^")[0]) * (portion / recipe.portion)} {ingredient.split("^")[1]}
                </p>
            ))}
          </div>
          {recipe && recipe.sections && recipe.sections.map((section,nb) => (
            <div className='recipe-note-card'>
              <h3>{section.name}</h3>
              {section && section.steps.map((step,nb) => (
                <p className='recipe-card-row'>{(nb+1)}.&nbsp;{step}</p>
              ))}
            </div>
          ))}

          <div className='container'>
            <div style={{color:'white'}}>
              Credit: <br />
              {recipe.source}
            </div>
          </div>
    </div>
  );
};
export default RecipeDetails;
