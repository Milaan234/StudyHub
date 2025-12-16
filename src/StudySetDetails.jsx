import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import ReactMarkdown from 'react-markdown';

import { useEffect, useState } from 'react';
import { getPracticeQuizFromDB, getStudyNotesFromDB, getPracticeQuizResultsFromDB, getFlashcardsFromDB, getEnhancedNotesFromDB } from './firestoreFunctions';
import { Card } from 'react-bootstrap';
import { deleteStudySetFromDB } from './firestoreFunctions';


function StudySetDetails({userUID, studySet, setPage, setCurrentPracticeQuiz, setStudySetTitle, setStudySetID, setCurrentFlashcards}) {

    const [userNotes, setUserNotes] = useState("Loading notes...");
    const [questions, setQuestions] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [results, setResults] = useState([]);
    const [enhancedNotes, setEnhancedNotes] = useState("Loading enhanced notes...");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function loadSetData() {
            setIsLoading(true);
            if(userUID && studySet) {
                try {
                    if(isMounted) setIsLoading(true);
                    const userNotesFromDB = await getStudyNotesFromDB(userUID, studySet.id);
                    const questionsFromDB = await getPracticeQuizFromDB(userUID, studySet.id);
                    const flashcardsFromDB = await getFlashcardsFromDB(userUID, studySet.id);
                    const results = await getPracticeQuizResultsFromDB(userUID, studySet.id);
                    const enhancedNotesFromDBRaw = await getEnhancedNotesFromDB(userUID, studySet.id);
                    const enhancedNotesFromDB = enhancedNotesFromDBRaw.replace(/\\n/g, '\n');
                    if(isMounted) {
                        setUserNotes(userNotesFromDB);
                        setQuestions(questionsFromDB);
                        setFlashcards(flashcardsFromDB);
                        results.sort((a, b) => new Date(b.time.toDate()) - new Date(a.time.toDate()));
                        setResults(results);
                        setEnhancedNotes(enhancedNotesFromDB);
                        setIsLoading(false);
                    }
                } catch(error) {
                    console.log(error);
                    if(isMounted) setIsLoading(false);
                }

            }
        }
        loadSetData();
        return ()=>{isMounted = false;}
      }, [userUID, studySet]);

    async function openPracticeQuiz() {
        console.log("Opening practice quiz");
        try {
            const questions = await getPracticeQuizFromDB(userUID, studySet.id);
            setCurrentPracticeQuiz(questions);
            setStudySetTitle(studySet.title);
            setPage("practiceQuiz")
            setStudySetID(studySet.id);
        } catch(error) {
            alert("Error getting practice quiz");
            console.log("Error getting practice quiz: ", error);
        }
    }

    async function openFlashcards() {
        setStudySetTitle(studySet.title);
        setCurrentFlashcards(flashcards);
        setPage("flashcards")
        setStudySetID(studySet.id);
    }

    async function deleteStudySet() {
        if(confirm(`Are you sure you want to delete this Study Set?\nTitle: ${studySet.title}\nNote: This action cannot be undone!`)) {
            document.getElementById("deleteStudySetButton").setAttribute('disabled', 'true');
            await deleteStudySetFromDB(userUID, studySet.id);
            setPage("allStudySets");
        }
    }

    return (
        <>
            <Container id={studySet.id}>
                <h1 className="mb-4" style={{color: '#003366'}}>{studySet.title}</h1>
                <Button variant='primary' onClick={openPracticeQuiz} style={{ marginBottom: '10px'}}>Start Practice Quiz</Button>
                <Button variant='primary' onClick={openFlashcards} style={{ marginBottom: '10px', marginLeft:"20px"}}>Study Flashcards</Button>
                
                <div>
                    <h2 className="mb-3 mt-3" style={{color: '#003366'}}>AI Enhanced Notes</h2>
                    <div className='markdown-content'>
                        <ReactMarkdown id="enhancedNotesDisplay">{enhancedNotes}</ReactMarkdown>
                    </div>
                </div>

                <div>
                    <h2 className="mb-3" style={{color: '#003366'}}>Practice Quiz Results</h2>
                    {!isLoading ? 
                        results.length > 0 ?
                            results.map((result, index) => {
                                return (
                                    
                                    <Card key={result.id} className='mb-3'>
                                        <Card.Body>
                                            {result.time.toDate().toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}:  <span style={{fontWeight:"700", fontSize:"18px"}}>{result.score} / {result.totalQuestions}</span>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        : <Card className="mb-4"><Card.Header>No Results yet. Take a Practice Quiz to get started.</Card.Header></Card>
                    : <p>Loading results...</p>}
                </div>

                <div>
                    <h2 className="mb-3" style={{color: '#003366'}}>Flashcards (Count: {studySet.flashcardsLength})</h2>
                    {!isLoading ? flashcards.map((flashcard, index) => {
                        return (
                            <Card key={flashcard.id} className='mb-3'>
                                <Card.Header className="bg-light">
                                    <h3 className="flashcardTitle" style={{ fontSize: '20px' }}>{index + 1}. {flashcard.front}</h3>
                                </Card.Header>
                                <Card.Body>
                                    {flashcard.back}
                                </Card.Body>
                            </Card>
                        )
                    }) : <p>Loading flashcards...</p>}
                </div>

                <div>
                    <h2 className="mb-3" style={{color: '#003366'}}>Questions (Count: {studySet.practiceQuizLength})</h2>
                    {!isLoading ? questions.map((question, index) => {
                        return (
                            <Card key={question.id} className='mb-3'>
                                <Card.Header className="bg-light">
                                    <h3 className="questionTitle" style={{ fontSize: '20px' }}>{index + 1}. {question.question}</h3>
                                </Card.Header>
                                <Card.Body>
                                    Answer: {question.answer}
                                </Card.Body>
                            </Card>
                        )
                    }) : <p>Loading questions...</p>}
                </div>

                <div>
                    <h2 className="mb-3 mt-3" style={{color: '#003366'}}>Original Notes</h2>
                    <p id="userNotesDisplay">{userNotes}</p>
                </div>

                <div>
                    <Alert className='mt-4' variant="warning">Note: AI generated content. Check for mistakes.</Alert>
                </div>

                <div>
                    <Button id="deleteStudySetButton" className="mt-5 mb-4" variant="danger" onClick={deleteStudySet}>Delete Study Set</Button>
                </div>
            </Container>
        </>
  )
}

export default StudySetDetails
