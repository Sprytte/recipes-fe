import logo from './logo.svg';
import './App.css';
import RecipeList from './Pages/RecipeList';
import RecipeDetails from './Pages/RecipeDetails';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddRecipe from './Pages/AddRecipe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeList />}/>
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
