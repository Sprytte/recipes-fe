import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import Recipe from '../Components/Recipe';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { fraction, multiply, evaluate } from 'mathjs';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [portion, setPortion] = useState(1);
  // const math = require('mathjs')

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data.recipe))
      .catch(error => console.error('Error fetching recipe:', error));
  }, []);
  useEffect(() => {
    setPortion(recipe.portion)
    console.log(recipe)
  }, [recipe]);
  
  // function getIngredientPortion
  const calculateQty = (qty) => {
    if(portion != null && portion != 0){
      const final = multiply(fraction(qty),fraction(portion / recipe.portion))
      return final.toFraction()
    }
  }

  return (
    <div>
          <PageHeader />
          <div className="container">
            <div className='recipe-details-header'>
              <div className='inner'>
                <img src="https://www.allrecipes.com/thmb/BKa1OqunLWMkCDJm_3LtxF_Pn88=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23600-worlds-best-lasagna-DDMFS-4x3-1196-24c5401652934ffb96d3d94bc9fbe2d7.jpg" width={200}/>
              </div>
              <div className='inner'>
                <h3>{recipe.recipe_name} </h3>
                <p>{/*recipe.cook_time.split(":")[0] !== "00"*/} 
                  Total time: {recipe.cook_time} </p>
              </div>
              <div className='inner'>
                {/* TODO either return this as text or make api call to getById */}
                <p>{recipe.nationality} </p>
              </div>
            </div>
            <br/>
            <div>
              <Box sx={{ width: 300 }}>
              <Typography id="input-slider" gutterBottom style={{color: 'white'}}>
                Portion(s) <br />
                {portion}
              </Typography>
              {portion &&
                <Slider
                  className='slider-portion'
                  defaultValue={portion}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={(value) => setPortion(value.target.value)}
                  max={24}
                  min={1}
                />
              }
              </Box>
            </div>
          </div>

          {/* Ingredients */}
          <div className='recipe-note-card'>
            <h3>Ingredients</h3>
            {recipe && recipe.ingredients && recipe.ingredients.map((ingredient,nb) => (
              <p className='recipe-card-row'>
                {(nb+1)}.&nbsp;{calculateQty(ingredient.split("^")[0])} {ingredient.split("^")[1]}
                </p>
            ))}
          </div>

          {/* Sections */}
          {recipe && recipe.sections && recipe.sections.map((section,nb) => (
            <div className='recipe-note-card'>
              <h3>{section.section_name}</h3>
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
