import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faHome, faEnvelope, faCalendarAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
        if (e.target.name === 'address') {
            setAddress(e.target.value);
        }
        if (e.target.name === 'date') {
            setDate(e.target.value);
        }
    }

    async function handleSubmit() {
        try {
            const result = await axios.post(
                `http://localhost:8000/auth/signup`,
                { name: name, email: email, password: password, address: address, dob: date }
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
                    Signup
                </div>

                <FontAwesomeIcon icon={faUserCircle} className='main-icon' />

                <FontAwesomeIcon icon={faUser} className='icon' />
                <input
                    type='text'
                    name='name'
                    placeholder='| Enter name'
                    value={name}
                    onChange={handleChange}
                    className='form-input'
                />

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

                <FontAwesomeIcon icon={faHome} className='icon' />
                <input
                    type='text'
                    name='address'
                    placeholder='| Enter address'
                    value={address}
                    onChange={handleChange}
                    className='form-input'
                />

                <FontAwesomeIcon icon={faCalendarAlt} className='icon' />
                <input
                    type='date'
                    name='date'
                    placeholder='| Enter date of birth'
                    value={date}
                    onChange={handleChange}
                    className='form-input'
                />

                <button onClick={handleSubmit} className='submit'>Signup</button>
            </div>

        </div>
    )
}

export default Signup;