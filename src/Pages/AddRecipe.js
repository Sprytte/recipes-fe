import React, { useState, useEffect } from 'react';
import PageHeader from '../Components/PageHeader';
import Select from 'react-select';

const AddRecipe = () => {
    const [nationalities, setNationality] = useState([]);
    useEffect(() => {
              fetch(`http://localhost:8000/api/nationalities`)
                   .then(response => response.json())
                   .then(data => setNationality(data.nationalities))
                   .catch(error => console.error('Error fetching nationalities:', error));
         }, []);
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
              fetch(`http://localhost:8000/api/categories`)
                   .then(response => response.json())
                   .then((data) => {
                      const formatted = data.categories.map(cat => ({
                        value: cat.id,
                        label: cat.name
                      }));
                      setCategories(formatted);
                    })
                   .catch(error => console.error('Error fetching categories:', error));
         }, []);

     const [formData, setFormData] = useState({
          name: '',
          ingredients: [{ quantity: '', ingredient: '' }],
          type: [{id: 0, name: ''}],
          nationality: '',
          source: '',
          portion: 0,
          creator: 'Emilie',
          cookTime: '',
          imageLinks: '',
          sections: [{name: '', steps: [], time: '', order: 0}]
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          console.log(name + 'natinoaltu ' + value)
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
          //TODO DONT HARDCODE ORDER
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

        // const handleTypeChange = (sectionIndex, stepIndex, event) => {
        //   const { value } = event.target;
        //   const updatedFormData = { ...formData };
        //   updatedFormData.sections[sectionIndex].steps[stepIndex] = value;
        //   setFormData(updatedFormData);
        // };   
        const handleAddType = (choice) => {
          console.log(choice)
          let newCategories = [];
          choice.map(cat => {
            newCategories.push({
              id: cat.value,
              name: cat.label
            })
          });
          setFormData({
            ...formData, 
            type: newCategories
          });
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          const data = {
            ...formData,
            ingredients: formData.ingredients.map(item => `${item.quantity}^${item.ingredient}`),
            type: formData.type.map(type => type.id).toString(),
            imageLinks: formData.imageLinks.split(',').map(item => item.trim()),
            // sectionRequestDTOs: formData.sections
          };
          
          console.log(data)
          fetch(`http://localhost:8000/api/recipes/`, { method: "POST",
            body: JSON.stringify({
              recipe_name: data.name,
              ingredients: data.ingredients,
              type: data.type,
              nationality: data.nationality,
              source: data.source,
              portion: data.portion,
              creator:data.creator,
              image_links: data.imageLinks,
              // sectionRequestDTOs: data.sections
            }),
            headers: {
                "content-type": "application/json"
            }
          })
          .then((response) => response.json())
          .then(data => {
            console.log(data);
            sendSections(data.recipes.id)
          })
          .catch(response => console.log(response))
        };
        
        const sendSections = (recipe_id) => {
          console.log(formData.sections)
          // const section = formData.sections[0]
          formData.sections.forEach(section => {
          fetch(`http://localhost:8000/api/sections/`, { method: "POST",
            body: JSON.stringify({
              recipe_id: recipe_id,
              section_name: section.name,
              steps: section.steps,
              section_time: section.time,
              section_order: section.order
            }),
            headers: {
                "content-type": "application/json"
            }
          })
          .then(response => console.log(response))
          .catch(response => console.log(response))
          })
        }
      
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
                                    /> &nbsp;
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
                                <label>Source:</label>
                                <input type="text" name="source" value={formData.source} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Portion:</label>
                                <input type="number" name="portion" value={formData.portion} min={1} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Image Links (comma separated):</label>
                                <input type="text" name="imageLinks" value={formData.imageLinks} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Sections:</label>
                                {formData.sections.map((section, index) => (
                                <div key={index} className='section-container'>
                                  <div>
                                    <label>Name:</label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={section.name}
                                      onChange={(event) => handleSectionChange(index, event)}
                                    />
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
                                      value={index + 1}
                                      onChange={(event) => handleSectionChange(index, event)}
                                    />
                                  </label>
                                  <div className='step-container'>
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
                                        <button type="button" onClick={() => handleRemoveStep(index, stIndex)}>
                                          <span>x</span> Remove Step
                                        </button>
                                      </div>
                                    ))}
                                    <button type="button" onClick={() => handleAddStep(index)}>
                                      <span>+</span> Add Step
                                    </button>
                                  </div>
                                  <button type="button" onClick={() => handleRemoveSection(index)}>
                                    Remove Section
                                  </button>
                                </div>
                              ))}
                                <button type="button" onClick={handleAddSection}>Add Section</button>
                              </div>
                              <div>
                                <label>Tags:</label>
                                {categories && <Select
                                  name="type" 
                                  // value={formData.type} 
                                  onChange={(choice) => handleAddType(choice)}
                                  isMulti
                                  options={categories}
                                  // defaultValue={categories[0].value}
                                  isSearchable
                                  />}
                              </div>
                              <div>
                                <label>Nationality:</label>
                                <select
                                  name="nationality"
                                  value={formData.nationality}
                                  onChange={handleChange}
                                  >
                                    {nationalities.map((nat) => (
                                      <option value={nat.id}>{nat.name}</option>
                                    ))}
                                  </select>
                              </div>
                              <button type="submit">Done</button>
                         </form>
               </div>
          </div>
     </div>
     );
     }
      

export default AddRecipe;
