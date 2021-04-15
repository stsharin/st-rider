import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import fakeData from '../../fakeData/fakeData'
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(fakeData);
    }, [])

    // console.log(vehicles);

    return (
        <Row style={{ marginTop: '50px' }}>
            {
                vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
            }
        </Row>
    );
};

export default Home;