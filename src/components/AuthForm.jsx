import { useState } from 'react';
import { authService } from '../services/api';

export default function AuthForm({ onAuthenticated }) {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isRegister = mode === 'register';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user } = isRegister
                ? await authService.register({ name, email, password })
                : await authService.login({ email, password });

            onAuthenticated(user);
        } catch (err) {
            const message = err.response?.data?.message
                || Object.values(err.response?.data?.errors || {})[0]?.[0]
                || 'A apărut o eroare. Încearcă din nou.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="card auth-card">
                <h3 className="card-title">{isRegister ? '📝 Creează cont' : '🔑 Autentificare'}</h3>

                <form onSubmit={handleSubmit} className="form-stack">
                    {isRegister && (
                        <div>
                            <label className="field-label" htmlFor="auth-name">Nume</label>
                            <input id="auth-name" type="text" value={name} onChange={e => setName(e.target.value)} required className="text-input" />
                        </div>
                    )}

                    <div>
                        <label className="field-label" htmlFor="auth-email">Email</label>
                        <input id="auth-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="text-input" />
                    </div>

                    <div>
                        <label className="field-label" htmlFor="auth-password">Parolă</label>
                        <input id="auth-password" type="password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} required className="text-input" />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading} className="btn btn-primary btn-block">
                        {loading ? 'Se procesează...' : (isRegister ? 'Creează cont' : 'Intră în cont')}
                    </button>
                </form>

                <button
                    type="button"
                    className="auth-switch"
                    onClick={() => { setMode(isRegister ? 'login' : 'register'); setError(''); }}
                >
                    {isRegister ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Creează unul'}
                </button>
            </div>
        </div>
    );
}
