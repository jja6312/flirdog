import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import SomoimMainBody from './main/SomoimMainBody';
import { Link } from 'react-router-dom';

const SomoimMain = () => {
    // const [login, setLogin] = useState({
    //     id: 1,
    //     email: 'aaa@aaa.aaa',
    //     passwd: '1111'
    // })

    return (
        <div>
            <Header></Header>
            {/* <Link to={'/somoimTest'} >소모임 코드 테스트 구간</Link> */}
            <div style={{ width: "100%", textAlign: "center", height: '1rem' }}>
            </div>

            {/* <SomoimMainBody login={login} ></SomoimMainBody> */}
            <SomoimMainBody></SomoimMainBody>

            <div style={{ height: 50 }}></div>
            <Footer></Footer>
        </div>
    );
};

export default SomoimMain;