import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import { getUserAPIKey, getUserName, updateUserAPIKey, updateUserName } from './firestoreFunctions.js';
import './App.css';

function SettingsPage({user}) {  

    const [userName, setUserName] = useState("");
    const [userAPIKey, setUserAPIKey] = useState("");

    useEffect(() => {
        async function initializeSettingsPage() {
            const nameFromDB = await getUserName(user);
            setUserName(nameFromDB);
            const userAPIKeyFromDB = await getUserAPIKey(user);
            setUserAPIKey(userAPIKeyFromDB);
        }
        initializeSettingsPage();
    }, [user]);
    
    async function updateUserSettings() {
        try {
            await updateUserName(user, userName);
            await updateUserAPIKey(user, userAPIKey);
            alert("Update successful! Reload the page to see changes.")
        } catch(error) {}
    }

    return (
        <>
            <Container>
                <Card className='border-0 bg-transparent'>
                    <Card.Header className='border-0 bg-transparent ps-0'>
                        <h2 style={{color: "#003366", fontWeight:"650"}}>Settings</h2>
                    </Card.Header>
                    <Card.Body className='bg-color:transparent bw-0'>
                        <Form onSubmit={(e)=>{e.preventDefault()}}>
                            <Form.Group>
                                <Form.Label style={{color: "#003366", fontSize:"24px"}}>Name</Form.Label>
                                <Form.Control type="input" value={userName} onChange={(e)=>{setUserName(e.target.value)}}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <Form.Label style={{color: "#003366", fontSize:"24px"}}>Gemini API Key</Form.Label>
                                <Form.Control type="password" value={userAPIKey} onChange={(e)=>{setUserAPIKey(e.target.value)}}></Form.Control>
                            </Form.Group>
                            <Button className='mt-5' variant="outline-primary" onClick={updateUserSettings}>Save</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default SettingsPage
