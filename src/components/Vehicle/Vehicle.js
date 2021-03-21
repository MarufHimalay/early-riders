import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const { image, vehicle } = props;
    return (
        <div className="col-md-3">
            <div style={{ border: '2px solid gray', borderRadius: '5px', paddingTop: '10px' }} className=" text-center">
                <img style={{ maxWidth:'80%' }} src={image} alt="" />
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/book/${vehicle}`}> <p>{vehicle}</p> </Link>
            </div>
        </div>
    );
};

export default Vehicle;