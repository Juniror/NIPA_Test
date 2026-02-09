import { useState } from 'react';
import '../css/LoginModal.css';
import InfoGroup from '../components/util/InfoGroup';
import CustomInput from '../components/util/CustomInput';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {

                onLogin(data.user);

            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay login-modal-overlay">
            <div className="modal-content login-modal-content">
                <h2 className="login-title">Dashboard Login</h2>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <InfoGroup label="Username">
                        <CustomInput
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </InfoGroup>

                    <InfoGroup label="Password">
                        <CustomInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InfoGroup>

                    <button
                        type="submit"
                        className="status-btn accepted active login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="login-hint">
                    Default: em01 / password
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
