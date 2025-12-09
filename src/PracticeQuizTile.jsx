// !!! Not being used anymore. Replaced with StudySetTile

import { useEffect, useState } from 'react'
import PracticeQuiz from './PracticeQuiz'
import AllPracticeQuizzes from './AllPracticeQuizzes';
import { getPracticeQuizFromDB } from './firestoreFunctions';

function PracticeQuizTile({practiceQuiz, setPage, setCurrentPracticeQuiz}) {

    async function openPracticeQuiz() {
        const questions = await getPracticeQuizFromDB();
        setCurrentPracticeQuiz(practiceQuiz.questions);
        setPage("practiceQuiz")
    }

    return (
        <>
        <div id={practiceQuiz.id}>
            <h2>{practiceQuiz.title}</h2>
            <button onClick={openPracticeQuiz}>Start Practice Quiz</button>
        </div>
        </>
    )
}

export default PracticeQuizTile
