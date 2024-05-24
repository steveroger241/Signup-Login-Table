import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    async function handleSubmit() {
        try {
            const result = await axios.post(
                `http://localhost:8000/auth/signin`,
                { email: email, password: password }
            );

            if (result.data.success) {
                setAuth({ ...auth, user: null, token: '' });
                localStorage.removeItem('user');

                setAuth({ user: result.data.result.email, token: result.data.token });
                localStorage.setItem('user', JSON.stringify({ user: result.data.result.email, token: result.data.token }));

                navigate('/');
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            console.log("Error is ----> ", err);
            alert("Error from frontend");
        }
    }

    return (
        <div className='outer'>

            <div className='form'>
                <div className='form-heading'>
                    Signin
                </div>

                <FontAwesomeIcon icon={faUserCircle} className='main-icon'/>

                <FontAwesomeIcon icon={faEnvelope} className='icon' />
                <input
                    type='text'
                    name='email'
                    placeholder='| Enter email'
                    value={email}
                    onChange={handleChange}
                    className='form-input'
                />

                <FontAwesomeIcon icon={faLock} className='icon' />
                <input
                    type='text'
                    name='password'
                    placeholder='| Enter password'
                    value={password}
                    onChange={handleChange}
                    className='form-input'
                />

                <button onClick={handleSubmit} className='submit'>Signin</button>
            </div>

        </div>
    )
}

export default Signin;