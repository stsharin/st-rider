import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route, Router } from 'react-router';
import { Link } from 'react-router-dom';
import Destination from '../Destination/Destination';

const Vehicle = (props) => {
    const { id, type, image } = props.vehicle;
    const handleVehicleClick = () => {
        // console.log('Vehicle clicked');
    }
    return (
        <Col>
            <Link to='/destination'>
                <Button onClick={handleVehicleClick} style={{marginLeft:'5px', backgroundColor: 'lightGray'}}>
                    <Card style={{ width: '15rem', backgroundColor: 'lightGray'}}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title style={{ color: 'black' }}>{type}</Card.Title>
                        </Card.Body>
                    </Card>
                </Button>
            </Link>

        </Col>
    );
};

export default Vehicle;