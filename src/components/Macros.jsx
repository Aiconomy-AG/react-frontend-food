const FIELDS = [
    { key: 'calories', label: 'Calorii', icon: '🔥', unit: 'kcal' },
    { key: 'protein_g', label: 'Proteine', icon: '💪', unit: 'g' },
    { key: 'carbohydrates_g', label: 'Carbo', icon: '🌾', unit: 'g' },
    { key: 'fat_g', label: 'Grăsimi', icon: '🥑', unit: 'g' },
    { key: 'sugar_g', label: 'Zahăr', icon: '🍬', unit: 'g' },
];

export default function Macros({ macros, loading }) {
    if (loading) {
        return (
            <div className="macros-box">
                <div className="macros-title">🔥 Macros</div>
                <div className="macros-loading">
                    {FIELDS.map(f => <span key={f.key} className="skeleton-pill" />)}
                </div>
            </div>
        );
    }

    if (!macros) return null;

    return (
        <div className="macros-box">
            <div className="macros-title">🔥 Macros</div>
            <div className="macros-grid">
                {FIELDS.map(f => {
                    const value = macros[f.key];
                    const hasValue = value !== null && value !== undefined;

                    return (
                        <span className={`macro-pill${hasValue ? '' : ' is-empty'}`} key={f.key}>
                            {f.icon} {f.label}: <strong>{hasValue ? `${value}${f.unit}` : 'N/A'}</strong>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}