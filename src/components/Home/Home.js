import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Header from '../Header';
import fakeData from '../../fakedata.json';

import Vehicle from '../Vehicle/Vehicle';
const Home = () => {
    return (

        <div style={{margin:'10% auto'}} className="container text-center row gy-2">
            
            {
                fakeData.map(vh => <Vehicle vehicle={vh.vehicle} image={vh.image}></Vehicle>)
            }
        </div>

    );
};

export default Home;