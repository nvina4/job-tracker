import { useState } from "react"

function Signup({setShowSignup}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({email, password})
        })

        .then(res => res.json().then(data => {

            if (!res.ok) {

                throw new Error (data.error || 'Sign up failed');
            }
            return data;
        }))

        .then(data => setSuccessMessage(data.message))
        .catch(err => setErrorMessage(err.message));
    };


    return(
        <form onSubmit={handleSignup} className="auth-card">
        <h1 className="app-title">JobTrack</h1>

        <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button>Sign up</button>

        <button type='button' onClick={() => setShowSignup(false)}>Already have an account? Log in</button>

        {successMessage && <p className="success-text">{successMessage}</p>}
        {errorMessage && <p className="error-text">{errorMessage}</p>}
    </form>
    )
};

export default Signup;