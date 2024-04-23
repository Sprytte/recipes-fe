import logo from './logo.svg';
import './App.css';
import RecipeList from './Pages/RecipeList';
import RecipeDetails from './Pages/RecipeDetails';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeList />}/>
          <Route path="/{id}" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
