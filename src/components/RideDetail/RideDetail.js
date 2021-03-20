import React, { useState } from 'react';
import { useParams } from 'react-router';
import SimpleMap from '../SimpleMap/SimpleMap';
import fakeData from '../../fakedata.json';

const RideDetail = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [show, setShow] = useState('');
    const { vehicle } = useParams();
    const showVehicle = (e) => {
        e.preventDefault();
        setShow(true);
        console.log(vehicle);

    }

    const handleBlur = (e) => {
        if (e.target.name === 'start') {
            setStart(e.target.value);
        }
        if (e.target.name === 'end') {
            setEnd(e.target.value);
        }
    }
//    const name = fakeData.map(data=> data.vehicle === vehicle? data.vehicle)

const inputStyle = {
    border: 'none',
    borderBottom: '1px solid black',
    marginBottom: '1em'
  }
    return (
        <>
            <div className="row m-2">
                <div className="col-md-4 m-2 d-flex justify-content-center">
                    {!show && <form action="">
                        <h5>Pick Form</h5>
                        <input style={inputStyle} onBlur={handleBlur} type="text" name="start" id="" placeholder="Chittagong" />
                        <h5>Pick To</h5>
                        <input style={inputStyle} onBlur={handleBlur} type="text" name="end" id="" placeholder="Dhaka" />
                        <br />
                        <button style={{ width:'100%'}}className="btn btn-danger"onClick={showVehicle} value="ffg"> Search </button>
                    </form>}
                    {show && <div >
                        <div  className="">
                            <div>
                                <h3>{start}</h3>
                                <h3>{end}</h3>
                            </div>
                            <div className="d-flex align-items-center">
                            {fakeData.map(data =>  {
                                     if (data.vehicle === vehicle){
                                        return (
                                            <img style={{ height:'50px'}} src={data.image} alt="" />
                                        );}
                                })}
                               
                                <li>{vehicle}</li>
                                <img style={{ height:'20px'}} src={`https://i.ibb.co/ZNP2jWd/people.png`} alt="" />
                                {fakeData.map(data =>  {
                                     if (data.vehicle === vehicle){
                                        return ( <>
                                            <li>{data.sit}</li>
                                            <li>{data.fare}</li></>
                                        );}
                                })}
                                
                            </div>
                        </div>

                    </div>}

                </div>
                <div className="col-md-7 m-2">
                    <SimpleMap></SimpleMap>
                </div>

            </div>

        </>
    );
};

export default RideDetail;