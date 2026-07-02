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

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
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
        <>
            <h3 className="card-title">➕ Adaugă o rețetă nouă</h3>
            <form onSubmit={handleSubmit} className="form-stack">
                <div>
                    <label className="field-label" htmlFor="recipe-title">Nume mâncare</label>
                    <input id="recipe-title" type="text" placeholder="ex: Ciorbă de pui" value={title} onChange={e => setTitle(e.target.value)} required className="text-input" />
                </div>

                <div>
                    <label className="field-label" htmlFor="recipe-time">Timp gătire</label>
                    <input id="recipe-time" type="number" min="1" placeholder="minute" value={cookTime} onChange={e => setCookTime(e.target.value)} required className="text-input" />
                </div>

                <div>
                    <label className="field-label" htmlFor="recipe-ingredient">Ingrediente</label>
                    <div className="ingredient-row">
                        <input
                            id="recipe-ingredient"
                            type="text"
                            placeholder="ex: 100g ouă"
                            value={currentIngredient}
                            onChange={e => setCurrentIngredient(e.target.value)}
                            onKeyDown={handleIngredientKeyDown}
                            className="text-input"
                        />
                        <button type="button" onClick={addIngredient} className="icon-btn" aria-label="Adaugă ingredient">+</button>
                    </div>
                    <p className="hint">Scrie gramajul ca să calculăm macros corect, ex. "100g orez".</p>

                    {ingredients.length > 0 && (
                        <div className="chip-list">
                            {ingredients.map((ing, i) => (
                                <span className="chip" key={`${ing}-${i}`}>
                                    {ing}
                                    <button type="button" className="chip-remove" onClick={() => removeIngredient(i)} aria-label={`Șterge ${ing}`}>✕</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <Macros macros={macros} loading={macrosLoading} />
                </div>

                <div>
                    <label className="field-label" htmlFor="recipe-instructions">Instrucțiuni preparare</label>
                    <textarea id="recipe-instructions" placeholder="Cum se prepară..." value={instructions} onChange={e => setInstructions(e.target.value)} required rows="4" className="textarea-input" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">💾 Salvează Rețeta</button>
            </form>
        </>
    );
}