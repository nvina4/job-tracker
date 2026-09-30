import { useState } from 'react'


function Login({setToken, setShowSignup}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        })

        .then(res => res.json().then(data => {

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }
            return data;
            
        }))

        .then(data => {
            localStorage.setItem('token', data.token);
            setToken(data.token);
        })
        .catch(err => setErrorMessage(err.message));
    };


    return(
        <form onSubmit={handleLogin} className="auth-card">
        <h1 className="app-title">JobTrack</h1>

        <input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button>Log in</button>

        <button type='button' onClick={() => setShowSignup(true)}>Need an account? Sign up</button>

        {errorMessage && <p className="error-text">{errorMessage}</p>}
    </form>
    )
};



export default Login;