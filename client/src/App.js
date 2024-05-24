import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Signin from './Components/Signin';
import Table from './Components/Table';
import Signup from './Components/Signup';
import { useAuth } from './Context/AuthContext';

function App() {
  const [auth, setAuth] = useAuth();

  function logout() {
    localStorage.removeItem('user');
    setAuth({ ...auth, user: null, token: '' });
  }

  return (
    <div className="App">
      <Router>

        {
          auth.user ? (
            <div className='link-wrap'>
              <Link to='/signup' onClick={logout} className='link'>Logout</Link>
            </div>
          ) : (
            <div className='link-wrap'>
              <Link to='/signup' className='link'>Signup</Link>
              <Link to='/signin' className='link'>Signin</Link>
            </div>
          )
        }

        <Routes>

          <Route path='/' element={<Table />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
