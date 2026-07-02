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
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#ff4a5a', fontSize: '2.5rem', margin: 0 }}>🎲 Grocery & Recipe Planner</h1>

        </header>

        <RandomWheel randomRecipe={randomRecipe} onRoll={handleGetRandom} onClose={() => setRandomRecipe(null)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
          <RecipeForm onRecipeAdded={handleAddRecipe} />
          <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
        </div>
      </div>
  );
}

export default App;