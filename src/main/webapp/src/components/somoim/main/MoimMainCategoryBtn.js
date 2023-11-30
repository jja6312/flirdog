import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from 'react';

import styles from '../../../css/somoim/main/MoimMainCategoryBtn.module.css';
import axios from 'axios';

const MoimMainCategoryBtn = ({ onSearch  }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

    const expand = window.innerWidth >= 768 ? 'md' : false;

    const handleToggle = () => setShowMenu(!showMenu);
    const handleClose = () => setShowMenu(false);

    const onInput = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    const onSearchButtonClick = async () => {
        try {
            const res = await axios.get('/somoim/getSomoimList')
            setSearchData(res.data);

            onSearch({ search, searchData });
        } catch (e) {
            console.error(e);
        }
    }

    const onSearchButtonTouch = async () => {
        try {
            const res = await axios.get('/somoim/getSomoimList')
            setSearchData(res.data);

            onSearch({ search, searchData });
            setShowMenu(false);
        } catch (e) {
            console.error(e);
        }
    }

    // useEffect(() => {
    //     //console.log('MoimMainCategoryBtn searchData : ' + JSON.stringify(searchData));
    //     console.log('MoimMainCategoryBtn search : ' + search);
    //     onSearch({ search });
    //     //onSearch({ search, searchData });
    //     console.log('MoimMainCategoryBtn onSearch : ' + onSearch);
    // }, [searchData, onSearch, search]);  
    // ==> onSearch, search 얘네 떄문에 안됨(무한재귀 걸림...하지만 젠킨스때문에 무조건 넣어야 해서 다른 방식씀)

    return (
        <>
            <Navbar expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <NavbarToggle style={{ justifyContent: 'center' }} onClick={handleToggle} label='Toggle navigation'></NavbarToggle> &emsp;&emsp;&emsp;
                    <Navbar.Brand href="#" style={{ marginLeft: '-20%' }}>모집중인 모임</Navbar.Brand>
                    
                    <Navbar.Collapse id="navbarNav">
                        <Form className="d-none d-md-block d-flex" style={{ width: '100%', alignItems: 'center' }}>
                            <div className={styles.Rectangle29}>
                                <div className={`${styles.title}  text-nowrap pt-1 pb-1`}>제 목</div>
                                <div className={styles.Line2}></div>
                                <Form.Control
                                    type="search"
                                    value={ search }
                                    onChange={ onInput }
                                    placeholder="검색어를 입력하세요"
                                    className="me-2"
                                    style={{ width: 'calc(100% - 50px)', marginLeft: '85px' }}
                                    aria-label="Search"
                                />
                                <Button className={`${styles.search}  text-nowrap pt-1 pb-1`} variant="dark" onClick={ onSearchButtonClick }>검 색</Button>
                            </div>
                        </Form>
                    
                        <Offcanvas show={showMenu} onHide={handleClose} placement="bottom">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>모집 중인 모임 검색</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="flex-column">
                                    <Nav.Link href="#">소모임 이름입력</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    value={ search }
                                    onChange={ onInput }
                                    placeholder="검색어를 입력하세요"
                                    className="me-2"
                                    aria-label="Search"
                                    style={{width:'70%'}}
                                />
                                <Button className='text-nowrap' variant="outline-success" style={{width:'30%'}} onClick={ onSearchButtonTouch }> 검색</Button>
                            </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default MoimMainCategoryBtn;