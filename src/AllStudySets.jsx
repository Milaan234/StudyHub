import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect } from 'react'
import { getStudySetsFromDB } from './firestoreFunctions';
import StudySetTile from './StudySetTile';


function AllStudySets({setCurrentPracticeQuiz, setPage, userUID, studySets, setStudySets, setCurrentStudySet, setStudySetTitle, setStudySetID, userName, setCurrentFlashcards}) {

    useEffect(()=> {
        async function getDataFromDB() {
            const data = await getStudySetsFromDB(userUID);
            data.sort((a, b) => new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate()));
            setStudySets(data);
        }
        getDataFromDB();
    }, [userUID])


    return (
        <>
            <h1 className="dashboardIntro" style={{marginTop:"3rem"}}>Welcome {userName},</h1>
            <h2 className="dashboardIntro" style={{marginBottom:"3rem"}}>What will we learn today?</h2>
            <Button id="newStudySetButton" variant="primary" onClick={()=>{setPage("createStudySet")}} style={{fontSize:"20px", borderRadius: '20px', borderWidth: '2px'}}>+ Create New Study Set</Button>
            <Row style={{marginLeft:"2rem"}}>
                {studySets.length > 0 ? studySets.map((studySet) => {
                    return (
                        <Col  key={studySet.id} xs={12} md={4} lg={3} className="mb-4">
                            <StudySetTile studySet={studySet} userUID={userUID} setPage={setPage} setCurrentPracticeQuiz={setCurrentPracticeQuiz} setCurrentStudySet={setCurrentStudySet} setStudySetTitle={setStudySetTitle} setStudySetID={setStudySetID} setCurrentFlashcards={setCurrentFlashcards} />
                        </Col>
                    )
                }) : <h3 style={{color:"#003366", textAlign:"center", marginTop:"5rem"}}>Created Study Sets to get started</h3>}
            </Row>


        </>
    )
}

export default AllStudySets
