import React, { useState } from 'react';
import PageHeader from '../Components/PageHeader';

const AddRecipe = () => {
     const [formData, setFormData] = useState({
          name: '',
          ingredients: [{ quantity: '', ingredient: '' }],
          type: '',
          nationality: '',
          source: '',
          portion: 0,
          creator: '',
          cookTime: '',
          imageLinks: ''
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
        };
      
        const handleIngredientChange = (index, event) => {
          const { name, value } = event.target;
          const newIngredients = [...formData.ingredients];
          newIngredients[index][name] = value;
          setFormData({ ...formData, ingredients: newIngredients });
        };
      
        const handleAddIngredient = () => {
          setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { quantity: '', ingredient: '' }]
          });
        };
      
        const handleRemoveIngredient = (index) => {
          const newIngredients = formData.ingredients.filter((_, i) => i !== index);
          setFormData({ ...formData, ingredients: newIngredients });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          const data = {
            ...formData,
            ingredients: formData.ingredients.map(item => `${item.quantity};${item.ingredient}`),
            type: formData.type.split(',').map(item => item.trim()),
            imageLinks: formData.imageLinks.split(',').map(item => item.trim())
          };
          console.log(data);
          // Here you can send 'data' to your backend server
        };
      
        return (
          <div>
               <PageHeader />
               <div  className="container">
                    <div className="form-container">
                         <h1>Recipe Form</h1>
                         <form onSubmit={handleSubmit}>
                              <div>
                              <label>Name:</label>
                              <input type="text" name="name" value={formData.name} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Ingredients:</label>
                              {formData.ingredients.map((ingredient, index) => (
                                   <div key={index} className="ingredient-row">
                                   <input
                                   type="text"
                                   name="quantity"
                                   placeholder="Quantity"
                                   value={ingredient.quantity}
                                   onChange={(event) => handleIngredientChange(index, event)}
                                   />
                                   <input
                                   type="text"
                                   name="ingredient"
                                   placeholder="Ingredient"
                                   value={ingredient.ingredient}
                                   onChange={(event) => handleIngredientChange(index, event)}
                                   />
                                   <button type="button" onClick={() => handleRemoveIngredient(index)}>x</button>
                                   </div>
                              ))}
                              <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                              </div>
                              <div>
                              <label>Type (comma separated):</label>
                              <input type="text" name="type" value={formData.type} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Nationality:</label>
                              <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Source:</label>
                              <input type="text" name="source" value={formData.source} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Portion:</label>
                              <input type="number" name="portion" value={formData.portion} min={1} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Creator:</label>
                              <input type="text" name="creator" value={formData.creator} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Cook Time:</label>
                              <input type="text" name="cookTime" value={formData.cookTime} onChange={handleChange} />
                              </div>
                              <div>
                              <label>Image Links (comma separated):</label>
                              <input type="text" name="imageLinks" value={formData.imageLinks} onChange={handleChange} />
                              </div>
                              <button type="submit">Done</button>
                         </form>
               </div>
          </div>
     </div>
     );
     }
      

export default AddRecipe;
