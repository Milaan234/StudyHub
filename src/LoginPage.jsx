import { useEffect, useState } from 'react';
import {auth} from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


function LoginPage({setLoggedIn, setPage}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function tryLogin() {        
        if(!email || !password) {
            alert("Please fill in all fields!");
        } else {
            // try logging in
            try {
                await signInWithEmailAndPassword(auth, email, password);
                setLoggedIn(true);
                setPage("allStudySets");
            } catch(error) {
                alert("Error! Incorrect email or password. Please try again!");
                console.log(error);
            }
        }
    }

  
    return (
        <>
            <h1>Login</h1>
            <form onClick={(e)=>{e.preventDefault()}} id="loginForm">
                <h2>Email</h2>
                <input type="text" id="loginEmail" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                <h2>Password</h2>
                <input type="password" id="loginPassword" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                <button id="loginButton" onClick={tryLogin}>Log in</button>
                <br>
                </br>
                <button id="gotoSignupButton" onClick={()=>{setPage("signup")}}>Sign up</button>
            </form>
        </>
    )
}

export default LoginPage
