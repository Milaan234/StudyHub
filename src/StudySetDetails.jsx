import { useEffect, useReducer, useState } from 'react';
import { getPracticeQuizFromDB, getStudyNotesFromDB } from './firestoreFunctions';


function StudySetDetails({userUID, studySet, setPage, setCurrentPracticeQuiz}) {

    const [userNotes, setUserNotes] = useState("Loading notes...");

    useEffect(() => {
        async function loadNotes() {
            if(userUID && studySet) {
                const userNotesFromDB = await getStudyNotesFromDB(userUID, studySet.id);
                setUserNotes(userNotesFromDB);
            }
        }
        loadNotes();
      }, [userUID, studySet]);

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

    return (
        <>
            <div id={studySet.id}>
                <h2>{studySet.title}</h2>
                <button onClick={openPracticeQuiz}>Start Practice Quiz</button>
                <h2>Notes</h2>
                <p id="userNotesDisplay">{userNotes}</p>
            </div>
        </>
  )
}

export default StudySetDetails
