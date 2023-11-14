import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { } from 'react-bootstrap';

const MoimMainCategoryBtn = () => {
    return (
        <>
            <Container>
                <React.Fragment>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light m-4 rounded shadow">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">Navbar</a>
                            <button className="navbar-toggler" type="button"
                                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Posts</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Profile</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </React.Fragment>
            </Container>
        </>
    );
};

export default MoimMainCategoryBtn;