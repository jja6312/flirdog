import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from 'react';

import styles from '../../../css/somoim/main/MoimMainCategoryBtn.module.css';

const MoimMainCategoryBtn = () => {
    const [showMenu, setShowMenu] = useState(false);

    const expand = window.innerWidth >= 768 ? 'md' : false;

    const handleToggle = () => setShowMenu(!showMenu);
    const handleClose = () => setShowMenu(false);

    return (
        <>
            <Navbar expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <NavbarToggle style={{ justifyContent: 'center' }} onClick={handleToggle} label='Toggle navigation'></NavbarToggle> &emsp;&emsp;&emsp;
                    <Navbar.Brand href="#" style={{ marginLeft: '-20%' }}>모집중인 모임</Navbar.Brand>
                    
                    <Navbar.Collapse id="navbarNav">
                        {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavDropdown title="Dropdown">
                                <NavDropdown.Item href="원하는 주소">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> */}
                        <Form className="d-none d-md-block d-flex" style={{ width: '100%', alignItems: 'center' }}>
                            <div className={styles.Rectangle29}>
                                <div className={`${styles.title}  text-nowrap pt-1 pb-1`}>제 목</div>
                                <div className={styles.Line2}></div>
                                <Form.Control
                                type="search"
                                placeholder="검색어를 입력하세요"
                                className="me-2"
                                style={{ width: 'calc(100% - 50px)', marginLeft: '85px' }}
                                aria-label="Search"
                                />
                                <Button className={`${styles.search}  text-nowrap pt-1 pb-1`} variant="dark">검 색</Button>
                            </div>
                        </Form>
                        
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                style={{ width: '100%' }}
                                aria-label="Search"
                            />
                            <Button className='text-nowrap' variant="outline-success" >검색</Button>
                        </Form> */}
                        <Offcanvas show={showMenu} onHide={handleClose} placement="bottom">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>모집 중인 모임Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="flex-column">
                                    <Nav.Link href="원하는 주소">Action</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button className='text-nowrap' variant="outline-success" >검색</Button>
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