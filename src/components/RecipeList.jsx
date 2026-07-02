export default function RecipeList({ recipes, onDeleteRecipe }) {
    return (
        <div>
            <h3 style={{ marginTop: 0 }}>📚 Rețetele tale ({recipes.length})</h3>
            {recipes.length === 0 ? (
                <p style={{ color: '#999' }}>Nu ai nicio rețetă salvată.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {recipes.map(recipe => (
                        <div key={recipe.id} style={styles.card}>
                            <button onClick={() => onDeleteRecipe(recipe.id)} style={styles.deleteBtn}>🗑️</button>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{recipe.title}</h4>
                            <small style={{ color: '#666' }}>⏱️ {recipe.cook_time} min</small>
                            <p style={{ margin: '10px 0 5px 0' }}><strong>Ingrediente:</strong> {recipe.ingredients.join(', ')}</p>
                            <p style={{ fontSize: '0.95rem', color: '#444', margin: 0 }}><strong>Preparare:</strong> {recipe.instructions}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    card: { padding: '20px', border: '1px solid #ddd', borderRadius: '10px', position: 'relative', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' },
    deleteBtn: { position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }
};