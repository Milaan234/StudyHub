import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import { useEffect, useState } from 'react'
import QuizQuestion from './QuizQuestion'
import { savePracticeQuizResultToDB } from './firestoreFunctions';

function PracticeQuiz({questions, setPage, page, studySetTitle, userUID, studySetID}) {

    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [shuffledQuestions, setShuffledQuestions] = useState([])


    useEffect(() => {
            function loadQuestions() {
                const shuffledQuestions = shuffleArray(questions);
                setShuffledQuestions(shuffledQuestions);
            }
            loadQuestions();
          }, [questions]);

    function shuffleArray(originalArray) {
        let originalArrayCopy = [...originalArray];
        let newArray = [];
        while(originalArrayCopy.length > 0) {
            const index = Math.floor(Math.random() * (originalArrayCopy.length));
            newArray.push(originalArrayCopy[index]);
            originalArrayCopy.splice(index, 1);
        }
        return newArray;
    }

    async function submitPracticeQuiz() {
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
        await savePracticeQuizResultToDB(userUID, studySetID, correctAnswers, questions.length);
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
            <Container className="mt-5 mb-5">
                <CloseButton onClick={closeQuiz} className="position-absolute top-0 end-0 m-3" aria-label='Close Quiz'></CloseButton>
                <h1 className="mb-5">Practice Quiz: {studySetTitle}</h1>
                {shuffledQuestions && shuffledQuestions.map((question, index) => {
                    return <QuizQuestion key={question.id} id={`questionID-${question.id}`} question={question} userAnswers={userAnswers} setUserAnswers={setUserAnswers} index={index}/>
                })}
                {submitted && <h2>Score: {score} / {questions.length}</h2>}
                <Button style={{marginRight:"10px"}} variant="primary" id="submitPracticeQuizButton" onClick={submitPracticeQuiz}>Submit Practice Quiz</Button>
                <Button variant="warning" onClick={closeQuiz}>Close</Button>
            </Container>
        </>
    )
}

export default PracticeQuiz
