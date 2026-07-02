export default function RandomWheel({ randomRecipe, onRoll, onClose }) {
    return (
        <div className="roll-wrap">
            <button onClick={onRoll} className="btn btn-roll">🎲 Ce mâncăm azi?</button>

            {randomRecipe && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <button onClick={onClose} className="modal-close" aria-label="Închide">✕</button>
                        <h2 className="modal-title">Azi gătești: {randomRecipe.title} 🍳</h2>

                        <div className="recipe-section">
                            <strong>Timp</strong>
                            ⏱️ {randomRecipe.cook_time} min
                        </div>

                        <div className="recipe-section">
                            <strong>Ingrediente</strong>
                            🛒 {randomRecipe.ingredients?.join(', ')}
                        </div>

                        <div className="recipe-section">
                            <strong>Pași</strong>
                            {randomRecipe.instructions}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}