// !!! Not being used anymore. Replaced with AllStudySets.jsx
import { useEffect, useState } from 'react'
import { getStudySetsFromDB, saveStudySetToDB } from './firestoreFunctions';
import StudySetTile from './StudySetTile';


function AllPracticeQuizzes({setCurrentPracticeQuiz, setPage, userUID, studySets, setStudySets}) {

    //const allQuizzes = JSON.parse(localStorage.getItem("allQuizes"));
    // const allQuizzes = [
    //     {
    //         id: 12345,
    //         title: "Geography",
    //         questions: [
    //             {
    //                 id: 101,
    //                 question: "What is the capital of France?",
    //                 answer: "Paris",
    //                 options: ["London", "Berlin", "Madrid", "Paris"]
    //             },
    //             {
    //                 id: 205,
    //                 question: "What is the capital of Germany?",
    //                 answer: "Berlin",
    //                 options: ["London", "Berlin", "Madrid", "Paris"]
    //             }
    //         ]
    //     },
    //     {
    //         id: 23456,
    //         title: "Sports",
    //         questions: [
    //             {
    //                 id: 101,
    //                 question: "Which is not a sport?",
    //                 answer: "Tennis",
    //                 options: ["Soccer", "Squash", "Rocketball", "Kickball"]
    //             },
    //             {
    //                 id: 205,
    //                 question: "Which is not a sport?",
    //                 answer: "Foosball",
    //                 options: ["Soccer", "Foosball", "Squash", "Kickball"]
    //             }
    //         ]
    //     }
    // ]


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
            <h1>All Practice Quizzes</h1>
            {studySets.map((studySet) => {
                return (
                    <StudySetTile key={studySet.id} studySet={studySet} userUID={userUID} setPage={setPage} setCurrentPracticeQuiz={setCurrentPracticeQuiz} />
                )
            })}
            <button onClick={saveOne}>Save</button>
            <button onClick={check}>Check</button>
        </>
    )
}

export default AllPracticeQuizzes
