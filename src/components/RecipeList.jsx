import Macros from './Macros';

export default function RecipeList({ recipes = [], onDeleteRecipe }) {
    // Ne asigurăm că recipes este întotdeauna un array valid pentru a putea citi .length
    const validRecipes = Array.isArray(recipes) ? recipes : [];

    return (
        <div>
            <div className="list-header">
                <h3 className="list-title">📚 Rețetele tale ({validRecipes.length})</h3>
            </div>

            {validRecipes.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-state-emoji">🍽️</span>
                    Nu ai nicio rețetă salvată încă.<br />Adaugă prima din formularul alăturat.
                </div>
            ) : (
                <div className="recipe-grid">
                    {validRecipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <button onClick={() => onDeleteRecipe(recipe.id)} className="delete-btn" aria-label="Șterge rețeta">🗑️</button>
                            <h4 className="recipe-card-title">{recipe.title}</h4>
                            <span className="recipe-meta">⏱️ {recipe.cook_time} min</span>

                            <div className="recipe-section">
                                <strong>Ingrediente</strong>
                                {recipe.ingredients?.join(', ') || 'Niciun ingredient adăugat'}
                            </div>

                            <div className="recipe-section">
                                <strong>Preparare</strong>
                                {recipe.instructions}
                            </div>

                            <Macros macros={recipe.macros} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}