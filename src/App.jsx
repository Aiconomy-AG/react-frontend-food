import { useState, useEffect } from 'react';
import { recipeService } from './services/api';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RandomWheel from './components/RandomWheel';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  const loadRecipes = async () => {
    try {
      const data = await recipeService.getAll();
      // Siguranță: dacă data nu e array, forțăm un array gol []
      setRecipes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Eroare la conectarea cu API-ul Laravel:", err);
      setRecipes([]); // Fallback în caz de eroare
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    try {
      await recipeService.create(newRecipe);
      loadRecipes();
    } catch (err) {
      alert("Eroare la salvare în baza de date!");
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("Sigur vrei să ștergi această rețetă?")) {
      try {
        await recipeService.delete(id);
        loadRecipes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGetRandom = async () => {
    try {
      const data = await recipeService.getRandom();
      setRandomRecipe(data);
    } catch (err) {
      alert("Adaugă mai întâi rețete în listă!");
    }
  };

  return (
      <div className="app-shell">
        <header className="app-header">
          <span className="brand">
            <span className="brand-emoji">🍲</span>
            Grocery &amp; Recipe Planner
          </span>
        </header>

        <div className="hero">
          <h1 className="hero-title">Ce gătim azi?</h1>
          <p className="hero-subtitle">Salvează rețete, calculează macros automat și lasă norocul să aleagă meniul.</p>
        </div>

        <RandomWheel randomRecipe={randomRecipe} onRoll={handleGetRandom} onClose={() => setRandomRecipe(null)} />

        <div className="layout-grid">
          <div className="card card-sticky">
            <RecipeForm onRecipeAdded={handleAddRecipe} />
          </div>
          <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
        </div>
      </div>
  );
}

export default App;