import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const {image, vehicle} = props;
    return (
        <div className="col-md-3">
            <img style={{width: '200px'}} src={image} alt=""/>
            <Link style={{textDecoration:'none', color:'black'}} to ={`/book/${vehicle}`}> <p>{vehicle}</p> </Link>
        </div>
    );
};

export default Vehicle;