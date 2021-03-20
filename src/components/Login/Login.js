import React, { useContext, useState } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: `/` } };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email }
        setLoggedInUser(signedInUser);
        history.replace(from);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch(err => {
        console.log(err)
        console.log(err.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          newUser: false,
          name: '',
          photo: '',
          password: '',
          email: '',
          error: '',
          isValid: false,
          success: false
        }
        setUser(signedOutUser);
      })
      .catch(err => {

      })
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setLoggedInUser(newUserInfo);
        history.replace(from);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setLoggedInUser(newUserInfo);
        history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setLoggedInUser(newUserInfo);
        });

    }
    e.preventDefault();
  }
  const handleBlur = (e) => {
    let isFromValid = true;
    if (e.target.name === 'email') {
      isFromValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFromValid = isPasswordValid && passwordHasNumber
    }
    if (isFromValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(newUserInfo);
  
    }
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
  const inputStyle = {
    border: 'none',
    borderBottom: '1px solid black',
    marginBottom: '1em'
  }
  const iconStyle = {
    marginRight: '5px', color: 'red', fontSize: '20px'
}
  return (
    <div  >
      <div className="d-flex justify-content-center">
        <form style={{ border: "1px solid gray", display: 'inline-block', margin: '5% auto', padding: '4em 3em' }} onSubmit={handleSubmit}>
          <h3>Login</h3>
          {newUser && <input style={inputStyle} type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}
          <br />
          <input style={inputStyle} type="text" name="email" onBlur={handleBlur} placeholder="Email" required />
          <br />
          <input style={inputStyle} type="password" name="password" onBlur={handleBlur} placeholder="Password" id="" required />
          <br />
          {newUser && <input style={inputStyle} type="password" name="password" onBlur={handleBlur} placeholder="Confirm Password" required />}

          <br />
          <input style={{ width: '100%', backgroundColor: 'orange', color: 'white', border: 'none' }} type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
          <br />
          <span>Do you have an account?</span>
          <button style={{ color: 'red' }} className="btn" onClick={() => setNewUser(!newUser)} name="newUser" id="" > Create an account </button>
          <label htmlFor="newUser"></label>
          <br />

        </form>
        </div>
        <div style={{}} className="text-center" >
          
          <div>
          <p >or</p>
          {
            user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
              <button style={{border:'1px solid gray'}} className="btn" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} style={iconStyle} />Continue with Google</button>
          }
          </div>
          <div>
          <button style={{border:'1px solid gray'}} className="btn" onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebookF} style={iconStyle} />Continue withFacebook</button>
          </div>
        </div>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
