import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Table() {
    const [data, setData] = useState([]);
    const [auth, setAuth] = useAuth();

    async function getAll() {
        try {
            const result = await axios.post(
                `http://localhost:8000/auth/getdata`,
                { email: auth.user }
            );

            if (result.data.success) {
                setData(result.data.result)
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

    useEffect(() => {
        if (auth.user) {
            getAll();
        }
    }, [auth]);

    return (
        <div className='outer-table'>
            {
                auth.user ? (
                    <table className='table'>
                        <tbody className='tbody'>
                            <tr className='tr'>
                                <th className='th'>#</th>
                                <th className='th fonting'>Name</th>
                                <th className='th'>Email</th>
                                <th className='th'>Address</th>
                                <th className='th'>Date of Birth</th>
                                <th className='th'>Status</th>
                            </tr>
                            {
                                data.map((dt, i) => {
                                    return (
                                        <tr key={i} className='tr'>
                                            <td className='td'>
                                                {i+1}
                                            </td>
                                            <td className='td fonting'>
                                                <FontAwesomeIcon icon={faUserCircle} className='icon-normal' />&nbsp;{dt.name}
                                            </td>
                                            <td className='td'>
                                                {dt.email}
                                            </td>
                                            <td className='td'>
                                                {dt.address}
                                            </td>
                                            <td className='td'>
                                                {dt.dob}
                                            </td>
                                            <td className='td'>
                                                <FontAwesomeIcon icon={faTrash} className='icon-trash' />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <FontAwesomeIcon icon={faEdit} className='icon-normal' />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className='error-message'>
                        You need to be a registered user to access the table <br /> Sign in or Signup first
                    </div>
                )
            }

        </div>
    )
}

export default Table;