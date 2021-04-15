import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router';
import { LoggedInUserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    return (
        <div style={{ marginBottom: '200px' }}>
            <Navbar bg="light"  fixed='top'>
                <Navbar.Brand href="/">ST Rider</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/destination">Destination</Nav.Link>
                    <Nav.Link href="/blog">Blog</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    {
                        !loggedInUser.name ? <Nav.Link href="/login">Login</Nav.Link> :
                            <Nav.Link href="/">{loggedInUser.name}</Nav.Link>
                    }

                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;