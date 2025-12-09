import { useEffect, useState } from 'react';
import {auth} from "./firebase.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


function SignupPage({setLoggedIn, setPage}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function trySignup() {
        console.log(email);
        // check if fields are empty
        if(!email || !password || !confirmPassword) {
            alert("Please fill in all fields!");
        } else {
            if(password === confirmPassword) {
                // try creating account
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    setLoggedIn(true);
                    setPage("allStudySets");
                } catch(error) {
                    alert("Error!");
                    console.log(error);
                }
            } else {
                alert("Passwords do not match!");
            }
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <form onClick={(e)=>{e.preventDefault()}} id="signupForm">
                <h2>Email</h2>
                <input type="text" id="signupEmail" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                <h2>Password</h2>
                <input type="password" id="signupPassword" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                <h2>Confirm Password</h2>
                <input type="password" id="confirmSignupPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} required></input>
                <button id="signupButton" onClick={trySignup}>Sign up</button>
                <br>
                </br>
                <button id="gotoLoginButton" onClick={()=>{setPage("login")}}>Login</button>
            </form>
        </>
    )
}

export default SignupPage
