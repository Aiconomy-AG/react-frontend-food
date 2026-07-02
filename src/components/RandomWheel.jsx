export default function RandomWheel({ randomRecipe, onRoll, onClose }) {
    return (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <button onClick={onRoll} style={styles.rollBtn}>🎲 Ce mâncăm azi?</button>

            {randomRecipe && (
                <div style={styles.modal}>
                    <button onClick={onClose} style={styles.closeBtn}>❌</button>
                    <h2 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>Azi gătești: {randomRecipe.title} 🍳</h2>
                    <p style={{ margin: '5px 0' }}><strong>⏱️ Timp:</strong> {randomRecipe.cook_time} min</p>
                    <p style={{ margin: '5px 0' }}><strong>🛒 Ingrediente:</strong> {randomRecipe.ingredients.join(', ')}</p>
                    <p style={{ fontStyle: 'italic', marginTop: '10px', color: '#333' }}><strong>Pași:</strong> {randomRecipe.instructions}</p>
                </div>
            )}
        </div>
    );
}

const styles = {
    rollBtn: { background: '#ff4a5a', color: 'white', border: 'none', padding: '15px 35px', fontSize: '1.3rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255, 74, 90, 0.3)' },
    modal: { background: '#fff4f5', border: '2px dashed #ff4a5a', padding: '25px', borderRadius: '15px', marginTop: '25px', position: 'relative', textAlign: 'left' },
    closeBtn: { position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }
};