import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LightningChargeFill, CardText, JournalText } from 'react-bootstrap-icons';

import { useState } from 'react';
import {auth} from "./firebase.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { setInitialUserData, updateUserAPIKey, updateUserEmail, updateUserName } from './firestoreFunctions.js';


function SignupPage({setLoggedIn, setPage}) {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function trySignup() {
        console.log(email);
        if(!userName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields!");
        } else {
            if(password === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    await setInitialUserData(user, email, userName);

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
            <Container fluid style={{marginLeft:"0px", paddingLeft:"20px", marginRight:"0px", paddingRight:"20px", width:"100%", maxWidth:"100%", paddingTop:"60px"}}>
                <Row className='g-5 justify-content-center'>
                <Col xs={12} md={6} lg={6}>
                        <Card className='bg-transparent' style={{borderWidth:"0px"}}>
                            <Card.Header className='bg-transparent' style={{borderRadius:"15px", borderWidth:"0px"}}>
                                <h1 style={{color: "#003366", textAlign:"left", fontSize:"45px"}}>Study App</h1>
                                <h3 className='mt-3' style={{color: "#003366", textAlign:"left"}}>An AI-Powered Study Tool to help students boost productivity</h3>
                            </Card.Header>
                            <Card.Body style={{color: "#003366"}}>
                                <Card className='d-flex flex-row align-items-center mb-4' style={{color: "#003366", padding:"10px", boxShadow:"0px 0px 10px lightgrey"}}><LightningChargeFill size={60} color="#003366" className='me-3'/><h4>Take AI generated <b>Practice Quizzes</b> to meet test day with confidence</h4></Card>
                                <Card className='d-flex flex-row align-items-center mb-4' style={{color: "#003366", padding:"10px", boxShadow:"0px 0px 10px lightgrey"}}><CardText size={50} color="#003366" className='me-3'/><h4>Strengthen knowledge with <b>Flashcards</b> created with AI</h4></Card>
                                <Card className='d-flex flex-row align-items-center mb-4' style={{color: "#003366", padding:"10px", boxShadow:"0px 0px 10px lightgrey"}}><JournalText size={57} color="#003366" className='me-3'/><h4>Study AI <b>Enhanced Notes</b> to efficiently understand the subject</h4></Card>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Card style={{width:"100%", maxWidth:"450px", borderRadius:"15px"}}>
                            <Card.Header className='bg-transparent' style={{borderRadius:"15px", borderWidth:"0px"}}>
                                <h1 style={{color: "#003366", textAlign:"center"}}>Sign up</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form onClick={(e)=>{e.preventDefault()}} id="loginForm">
                                    <Form.Group>
                                        <Form.Label style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Name</Form.Label>
                                        <Form.Control type="text" id="userName" placeholder="Name" value={userName} onChange={(e)=>{setUserName(e.target.value)}} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Email</Form.Label>
                                        <Form.Control type="text" id="signupEmail" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Password</Form.Label>
                                        <Form.Control type="password" id="signupPassword" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Confirm Password</Form.Label>
                                        <Form.Control type="password" id="confirmSignupPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} required></Form.Control>
                                    </Form.Group>
                                    <Button className='mt-3' variant="primary" id="signupButton" onClick={trySignup}  style={{fontSize:"20px"}}>Sign up</Button>
                                    <br>
                                    </br>
                                    <Button className='mt-3' variant="outline-primary" id="gotoLoginButton" onClick={()=>{setPage("login")}}>Log in</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}

export default SignupPage
