import React, { useContext, useState } from 'react';
import Footer from '../main/Footer';
import Header from '../main/Header';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContexts';

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const Login = () => {
    const { login } = useContext(UserContext);
    const [credentials, setCredentials] = useState({
        email: '',
        passwd: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
        }));
    };

    const handleLogin = () => {
        login(credentials);
    };

    return (
        <>
            <Header />
            <Container className='d-flex mt-5 mb-5' style={{ justifyContent: 'center'}}>
            <form style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2>로그인</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="passwd"
                        value={credentials.passwd}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    로그인
                </button>
            </form>
            </Container>
            <Footer />
        </>
    );
};

export default Login;