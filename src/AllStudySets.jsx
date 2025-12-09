import { useEffect, useState } from 'react'
import { getStudySetsFromDB, saveStudySetToDB } from './firestoreFunctions';
import StudySetTile from './StudySetTile';


function AllStudySets({setCurrentPracticeQuiz, setPage, userUID, studySets, setStudySets, setCurrentStudySet}) {

    useEffect(()=> {
        async function getDataFromDB() {
            const data = await getStudySetsFromDB(userUID);
            setStudySets(data);
        }
        getDataFromDB();
    }, [userUID])

    function saveOne() {
        if(userUID) {
            saveStudySetToDB(userUID, 4567, allQuizzes[1].title, "Sports note sample", allQuizzes[1].questions)
        }
    }

    function check() {
        console.log(studySets);
    }


    return (
        <>
            <h1>All Study Sets</h1>
            {studySets.map((studySet) => {
                return (
                    <StudySetTile key={studySet.id} studySet={studySet} userUID={userUID} setPage={setPage} setCurrentPracticeQuiz={setCurrentPracticeQuiz} setCurrentStudySet={setCurrentStudySet} />
                )
            })}
            <button onClick={saveOne}>Save</button>
            <button onClick={check}>Check</button>
        </>
    )
}

export default AllStudySets
