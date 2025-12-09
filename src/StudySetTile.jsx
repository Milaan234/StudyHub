import { useEffect, useState } from 'react'
import { getPracticeQuizFromDB } from './firestoreFunctions';

function StudySetTile({userUID, studySet, setPage, setCurrentPracticeQuiz, setCurrentStudySet}) {

    async function openPracticeQuiz() {
        console.log("Opening practice quiz");
        try {
            const questions = await getPracticeQuizFromDB(userUID, studySet.id);
            setCurrentPracticeQuiz(questions);
            setPage("practiceQuiz")
        } catch(error) {
            alert("Error getting practice quiz");
            console.log("Error getting practice quiz: ", error);
        }
    }

    function openStudySetDetails() {
        setCurrentStudySet(studySet);
        setPage("studySetDetails")
    }

    return (
        <>
        <div id={studySet.id}>
            <h2>{studySet.title}</h2>
            <button onClick={openPracticeQuiz}>Start Practice Quiz</button>
            <button onClick={openStudySetDetails}>Study Set Details</button>
        </div>
        </>
    )
}

export default StudySetTile
