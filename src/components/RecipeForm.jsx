import { useState, useEffect } from 'react';
import { nutritionService } from '../services/api';
import Macros from './Macros';

export default function RecipeForm({ onRecipeAdded }) {
    const [title, setTitle] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [macros, setMacros] = useState(null);
    const [macrosLoading, setMacrosLoading] = useState(false);

    useEffect(() => {
        if (ingredients.length === 0) {
            setMacros(null);
            return;
        }

        setMacrosLoading(true);
        const timeoutId = setTimeout(() => {
            nutritionService.calculate(ingredients)
                .then(setMacros)
                .catch(() => setMacros(null))
                .finally(() => setMacrosLoading(false));
        }, 600);

        return () => clearTimeout(timeoutId);
    }, [ingredients]);

    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredients.length === 0) return alert("Adaugă măcar un ingredient!");

        onRecipeAdded({
            title,
            cook_time: parseInt(cookTime),
            ingredients,
            instructions
        });

        setTitle(''); setCookTime(''); setInstructions(''); setIngredients([]); setMacros(null);
    };

    return (
        <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0 }}>➕ Adaugă o rețetă nouă</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Nume mâncare" value={title} onChange={e => setTitle(e.target.value)} required style={styles.input} />
                <input type="number" placeholder="Timp gătire (minute)" value={cookTime} onChange={e => setCookTime(e.target.value)} required style={styles.input} />

                <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="Ingredient (ex: 2 ouă)" value={currentIngredient} onChange={e => setCurrentIngredient(e.target.value)} style={styles.input} />
                        <button type="button" onClick={addIngredient} style={styles.buttonDark}>+</button>
                    </div>
                    <ul style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                        {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                    <Macros macros={macros} loading={macrosLoading} />
                </div>

                <textarea placeholder="Instrucțiuni preparare" value={instructions} onChange={e => setInstructions(e.target.value)} required rows="3" style={styles.input} />
                <button type="submit" style={styles.buttonSuccess}>💾 Salvează Rețeta</button>
            </form>
        </div>
    );
}

const styles = {
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' },
    buttonDark: { padding: '10px 15px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    buttonSuccess: { background: '#2e7d32', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
};