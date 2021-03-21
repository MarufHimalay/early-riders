import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useContext(UserContext);
    const styles = {
        
        listStyle: "none"
        
    }
    return (
        // <div style={{borderBottom:'1px solid gray'}} classNameName="container row p-2 mt-2">
        //     <div  classNameName="col-md-4 text-center ">
        //         <h2>EARLY RIDERS</h2>
        //     </div>
        //     <div classNameName="col-md-8 d-flex justify-content-around">
        //         <div classNameName="">
        //             <Link style={{textDecoration:"none", color:"black"}} to="/"><li style={styles}>Home</li></Link>
        //             <Link style={{textDecoration:"none", color:"black"}} to="/"><li style={styles}>Destination</li></Link>
        //             <li style={styles}>Blog</li>
        //             <li style={styles}>Contact</li>
        //             <li style={styles}>{loggedInUser.name || user.name}</li>
        //             {(!loggedInUser.name && !user.name) && < Button as={Link} to="/login/" classNameName="btn btn-danger">Login</Button>}
        //         </div>
        //     </div>
        // </div>
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Early Riders</Link>
                <Button className="navbar-toggler" type="Button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Blog</Link>
                        </li>
                        
                    </ul>
                    <span className="navbar-text">
                    <li style={styles} >{loggedInUser.name || user.email}</li>

      </span>
      {(!loggedInUser.name && !user.email)&& <Button as={Link} to="/login/" style={{backgroundColor:'red'}}>Login</Button>}
                </div>
            </div>
        </nav>
        </div>
    );
};

export default Header;