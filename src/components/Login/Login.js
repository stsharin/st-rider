import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { LoggedInUserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        isSignIn: false,
    });

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignIn: true,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
            });

    }


    const handleRandomSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                const { displayName, email } = userCredential.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignIn: true,

                };
                console.log(signedInUser);
                setLoggedInUser(signedInUser);

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }


    const handleSingOut = () => {
        firebase.auth()
            .signOut()
            .then((response) => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',

                }
                setLoggedInUser(signOutUser);

            })
            .catch((error) => {

            });

    }

    const handleChange = (event) => {
        // debugger;
        // console.log(event.target.name, event.target.value);
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            // console.log(isEmailValid);
        }
        if (event.target.name === 'password') {
            const isPassValid = event.target.value > 6;
            const isPassHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPassValid && isPassHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        // console.log(user.email, user.password);
        if (!newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // setLoggedInUser(user);
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(errorCode);
                    // ..
                });
            console.log('submitting');

        }
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            handleRandomSignIn(event);
        }
        event.preventDefault();
    }

    return (
        <div style={{textAlign: 'center'}}>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""></input>
            <label htmlFor="newUser">New User Sing Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" placeholder="Name" required onBlur={handleChange}></input>}
                <br />
                <input type="text" name="email" placeholder="enter email" required onBlur={handleChange} />
                <br />
                <input type="password" name="password" placeholder="enter pass" required onBlur={handleChange} />
                <br /> <br />
                <input type="submit" value="SUBMIT" />
                <br/>
            </form>
            <br/>
            {
                loggedInUser.isSignIn ? <Button onClick={handleSingOut}>Sing Out</Button> :
                    <Button onClick={handleGoogleSignIn}>Google Sign in</Button>
            }
            <br/>
        </div>
    );
};

export default Login;