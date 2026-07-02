export default function Macros({ macros, loading }) {
    if (loading) return <p style={styles.loading}>⏳ Calculez macros...</p>;
    if (!macros) return null;

    const fields = [
        { label: 'Calorii', value: macros.calories, unit: 'kcal' },
        { label: 'Proteine', value: macros.protein_g, unit: 'g' },
        { label: 'Carbohidrați', value: macros.carbohydrates_g, unit: 'g' },
        { label: 'Grăsimi', value: macros.fat_g, unit: 'g' },
        { label: 'Zahăr', value: macros.sugar_g, unit: 'g' },
    ];

    return (
        <div style={styles.box}>
            <strong style={{ fontSize: '0.85rem' }}>🔥 Macros</strong>
            <div style={styles.grid}>
                {fields.map(f => (
                    <span key={f.label}>
                        {f.label}: {f.value !== null && f.value !== undefined ? `${f.value}${f.unit}` : 'N/A'}
                    </span>
                ))}
            </div>
        </div>
    );
}

const styles = {
    loading: { fontSize: '0.85rem', color: '#999', margin: '10px 0 0 0' },
    box: { marginTop: '10px', padding: '10px', background: '#fff8e1', borderRadius: '8px', border: '1px solid #ffe082' },
    grid: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px', fontSize: '0.85rem', color: '#555' },
};
