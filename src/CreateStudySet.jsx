import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { useState } from 'react';
import {createStudySetWithAI} from './AIFunctions';
import { getLastDefaultAPIUse, getUserAPIKey, saveStudySetToDB, updateLastDefaultAPIUse } from './firestoreFunctions';


function CreateStudySet({setPage, userUID, user}) {

  const [studySetTitle, setStudySetTitle] = useState("");
  const [studyNotes, setStudyNotes] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [numFlashcards, setNumFlashcards] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  async function getDateDiff() {
    let lastUsedRaw = await getLastDefaultAPIUse(user);

    let lastUsedDate;
    if (lastUsedRaw && typeof lastUsedRaw.toDate === 'function') {
        lastUsedDate = lastUsedRaw.toDate();
    } else {
        lastUsedDate = lastUsedRaw;
    }
    lastUsedDate.setHours(0,0,0,0);
    let today = new Date();
    today.setHours(0,0,0,0);

    let diff = today - lastUsedDate;
    diff = diff / (1000 * 60 * 60 * 24);
    return diff;
  }

  async function createStudySet() {
    setIsLoading(true);
    const userAPIKey = await getUserAPIKey(user);

    console.log("calling function");

    let newStudySet = {};
    let questionsArray = [];
    let flashcardsArray = [];
    let enhancedNotes = "";

    if(userAPIKey) {
      newStudySet = await createStudySetWithAI(studyNotes, numQuestions, numFlashcards, userAPIKey, true);
      questionsArray = newStudySet[0];
      flashcardsArray = newStudySet[1];
      enhancedNotes = newStudySet[2];
    }

    if(!questionsArray || questionsArray.length === 0) {
      console.log("Error getting AI response with user's API key");

      const diff = await getDateDiff();

      if(diff <= 0) {
        alert("You have used today's free API use! Enter your own Gemini API Key in Settings, or try again tomorrow.")
        setIsLoading(false);
        return;
      }


      newStudySet = await createStudySetWithAI(studyNotes, numQuestions, numFlashcards, "", false);
      questionsArray = newStudySet[0];
      flashcardsArray = newStudySet[1];
      enhancedNotes = newStudySet[2];
    }

    

    if(!questionsArray || questionsArray.length === 0) {
      console.log("Error getting AI response with default API key");
      alert("Error receiving AI response");
      setIsLoading(false);
      return;
    } else {
      await updateLastDefaultAPIUse(user);
    }

    console.log("Saving study set to database");
    const newStudySetID = crypto.randomUUID();
    await saveStudySetToDB(userUID, newStudySetID, studySetTitle, studyNotes, questionsArray, flashcardsArray, enhancedNotes);
    console.log("done");
    setIsLoading(false);
    alert("Study set created!");
    setPage("allStudySets");
  }

  return (
    <>
      <Container className='mb-3'>
        <Card>
          <Card.Header>
            <h2 style={{color: "#003366"}}>Create Study Set</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e)=>{e.preventDefault()}} id="createStudySet">

              <Form.Group>
                <Form.Label style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Title</Form.Label>
                <Form.Control type="text" value={studySetTitle} onChange={(e)=>{setStudySetTitle(e.target.value)}} size="lg" />
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>Enter Study Notes</Form.Label>
                <Form.Control as="textarea" id="studyNotesTextbox" rows="5" cols="40" value={studyNotes} onChange={(e)=>{setStudyNotes(e.target.value)}}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>
                  <span >Number of Questions: </span>
                  <span>{numQuestions}</span>
                </Form.Label>
                <br></br>
                <Form.Range type="range" id="numQuestionsSlider" min="5" max="25" value={numQuestions} onChange={(e)=>{setNumQuestions(e.target.value)}} style={{width:"30%"}} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3" style={{fontSize:"24px", fontWeight:"600", color: "#003366"}}>
                  <span >Number of Flashcards: </span>
                  <span>{numFlashcards}</span>
                </Form.Label>
                <br></br>
                <Form.Range type="range" id="numQuestionsSlider" min="5" max="25" value={numFlashcards} onChange={(e)=>{setNumFlashcards(e.target.value)}} style={{width:"30%"}} />
              </Form.Group>

              <Button className="mt-4" variant="primary" id="createStudySetButton" onClick={createStudySet} disabled={isLoading}>Create Study Set</Button>
              {isLoading && <Spinner animation='border' className='me-2'></Spinner>}
            
              <Alert className='mt-4' variant="warning">Note: Study Notes will be sent to AI.</Alert>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default CreateStudySet
