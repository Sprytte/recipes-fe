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
          imageLinks: '',
          sections: [{name: '', steps: [], time: '', order: 0}]
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
      

        const handleSectionChange = (index, event) => {
          const { name, value } = event.target;
          const newSections = [...formData.sections];
          newSections[index][name] = value;
          setFormData({...formData, sections: newSections});
        };
        const handleAddSection = () => {
          setFormData({
            ...formData, 
            sections: [...formData.sections, {name: '', steps: [''], time: '', order: 0}]
          });
        };
        const handleRemoveSection = (index) => {
          const newSections = formData.sections.filter((_, i) => i !== index);
          setFormData({ ...formData, sections: newSections });
        };

        const handleStepChange = (sectionIndex, stepIndex, event) => {
          const { value } = event.target;
          const updatedFormData = { ...formData };
          updatedFormData.sections[sectionIndex].steps[stepIndex] = value;
          setFormData(updatedFormData);
        };   
        const handleAddStep = (sectionIndex) => {
          const updatedSections = [...formData.sections]
          updatedSections[sectionIndex] = {
            ...updatedSections[sectionIndex],
            steps: [...updatedSections[sectionIndex].steps, '']
          }
          setFormData({...formData, 
            sections: updatedSections});
        };
        const handleRemoveStep = (sectionIndex, stepIndex) => {
          const newSections = [...formData.sections];
          newSections[sectionIndex].steps = newSections[sectionIndex].steps.filter((_, index) => index !== stepIndex);
          setFormData({ ...formData, sections: newSections });
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          const data = {
            ...formData,
            ingredients: formData.ingredients.map(item => `${item.quantity}^${item.ingredient}`),
            type: formData.type.split(',').map(item => item.trim()),
            imageLinks: formData.imageLinks.split(',').map(item => item.trim()),
            // sectionRequestDTOs: formData.sections
          };
          
          console.log(data)
          fetch(`http://localhost:8080/recipes`, { method: "POST",
            body: JSON.stringify({
              name: data.name,
              ingredients: data.ingredients,
              type: data.type,
              nationality: data.nationality,
              source: data.source,
              portion: data.portion,
              creator:data.creator,
              cookTime: data.cookTime,
              imageLinks: data.imageLinks,
              sectionRequestDTOs: data.sections
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => console.log(response))
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
                              <div>
                                <label>Sections:</label>
                                {formData.sections.map((section, index) => (
                                <div key={index} style={{ marginBottom: '20px' }}>
                                  <label>
                                    Section Name:
                                    <input
                                      type="text"
                                      name="name"
                                      value={section.name}
                                      onChange={(event) => handleSectionChange(index, event)}
                                    />
                                  </label>
                                  <div style={{ marginTop: '10px' }}>
                                    <h4>Steps:</h4>
                                    {section.steps.map((step, stIndex) => (
                                      <div key={stIndex}>
                                        <label>
                                          Step {stIndex + 1}:
                                          <input
                                            type="text"
                                            name="step"
                                            placeholder="Step"
                                            value={step}
                                            onChange={(event) => handleStepChange(index, stIndex, event)}
                                          />
                                        </label>
                                        <button type="button" onClick={() => handleRemoveStep(index, stIndex)}>Remove Step</button>
                                      </div>
                                    ))}
                                    <button type="button" onClick={() => handleAddStep(index)}>
                                      Add Step
                                    </button>
                                  </div>
                                  <label>
                                    Time:
                                    <input
                                      type="text"
                                      name="time"
                                      value={section.time}
                                      onChange={(event) => handleSectionChange(index, event)}
                                    />
                                  </label>
                                  <label>
                                    Order:
                                    <input
                                      type="number"
                                      name="order"
                                      value={section.order}
                                      onChange={(event) => handleSectionChange(index, event)}
                                    />
                                  </label>
                                  <button type="button" onClick={() => handleRemoveSection(index)}>
                                    Remove Section
                                  </button>
                                </div>
                              ))}
                                <button type="button" onClick={handleAddSection}>Add Section</button>
                              </div>
                              <button type="submit">Done</button>
                         </form>
               </div>
          </div>
     </div>
     );
     }
      

export default AddRecipe;
