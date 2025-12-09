import { useEffect, useState } from 'react'
import QuizQuestion from './QuizQuestion'

function PracticeQuiz({questions, setPage}) {

    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    function submitPracticeQuiz() {
        document.getElementById("submitPracticeQuizButton").disabled = true;

        let correctAnswers = 0;
        questions.forEach(question => {
            const quizQuestionComponent = document.getElementById(`questionID-${question.id}`);
            if(!quizQuestionComponent) return;

            if(userAnswers[question.id] === question.answer) {
                correctAnswers++;
                const questionTitle = quizQuestionComponent.querySelector(".questionTitle");
                questionTitle.style.color = "green";
            } else {
                const questionTitle = quizQuestionComponent.querySelector(".questionTitle");
                questionTitle.style.color = "red";
            }

            const questionOptions = quizQuestionComponent.querySelectorAll(".questionOption");
            questionOptions.forEach((option) => {
                if(option.textContent.trim() === question.answer) {
                    option.style.color = "green";
                    option.style.weight = "bold";
                }
            })
        });

        setScore(correctAnswers);
        setSubmitted(true);
    }

    function closeQuiz() {
        if(submitted) {
            setPage("allStudySets");
        } else {
            if(confirm("Are you sure you would like to exit? Your progress will be lost.")) {
                setPage("allStudySets");
            }
        }
    }

    return (
        <>
            <h1>Practice Quiz</h1>
            {questions.map((question) => {
                return <QuizQuestion key={question.id} id={`questionID-${question.id}`} question={question} userAnswers={userAnswers} setUserAnswers={setUserAnswers}/>
            })}
            <button id="submitPracticeQuizButton" onClick={submitPracticeQuiz}>Submit Practice Quiz</button>
            {submitted && <h2>Score: {score} / {questions.length}</h2>}
            <button onClick={closeQuiz}>Close</button>
        </>
    )
}

export default PracticeQuiz
