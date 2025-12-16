import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { getFlashcardsFromDB, getPracticeQuizFromDB } from './firestoreFunctions';

function StudySetTile({userUID, studySet, setPage, setCurrentPracticeQuiz, setCurrentStudySet, setStudySetTitle, setStudySetID, setCurrentFlashcards}) {

    async function openPracticeQuiz() {
        console.log("Opening practice quiz");
        try {
            const questions = await getPracticeQuizFromDB(userUID, studySet.id);
            setCurrentPracticeQuiz(questions);
            setPage("practiceQuiz")
            setStudySetTitle(studySet.title);
            setStudySetID(studySet.id);
        } catch(error) {
            alert("Error getting practice quiz");
            console.log("Error getting practice quiz: ", error);
        }
    }

    async function openFlashcards() {
        console.log("Opening flashcards");
        try {
            const flashcards = await getFlashcardsFromDB(userUID, studySet.id);
            setCurrentFlashcards(flashcards);
            setPage("flashcards")
            setStudySetTitle(studySet.title);
            setStudySetID(studySet.id);
        } catch(error) {
            alert("Error getting practice quiz");
            console.log("Error getting practice quiz: ", error);
        }
    }

    function openStudySetDetails() {
        setCurrentStudySet(studySet);
        setPage("studySetDetails");
        setStudySetID(studySet.id);
    }

    return (
        <>
        <Card id={studySet.id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title style={{fontSize:'24px', paddingBottom:'10px'}}>{studySet.title}</Card.Title>
                <Button variant='outline-primary' onClick={openFlashcards} style={{ marginBottom: '10px', fontWeight:'bold', borderWidth: '2px'}}>Study Flashcards</Button>
                <Button variant='outline-primary' onClick={openPracticeQuiz} style={{ marginBottom: '10px', fontWeight:'bold', borderWidth: '2px'}}>Start Practice Quiz</Button>
                <Button variant='outline-primary' onClick={openStudySetDetails} style={{ marginBottom: '10px', fontWeight:'bold', borderWidth: '2px'}}>Study Set Details</Button>
            </Card.Body>
        </Card>
        </>
    )
}

export default StudySetTile
