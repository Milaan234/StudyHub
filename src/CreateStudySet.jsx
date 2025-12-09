import { useEffect, useReducer, useState } from 'react';
import {createStudySetWithAI} from './AIFunctions';
import { saveStudySetToDB } from './firestoreFunctions';


function CreateStudySet({setPage, userUID}) {

  const [studySetTitle, setStudySetTitle] = useState("");
  const [studyNotes, setStudyNotes] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);

  async function createStudySet() {
    console.log("calling function");
    const questionsArray = await createStudySetWithAI(studyNotes, numQuestions);
    if(questionsArray.length === 0) {
      console.log("Error getting AI questions");
      return;
    }
    console.log("Saving study set to database");
    const newStudySetID = crypto.randomUUID();
    await saveStudySetToDB(userUID, newStudySetID, studySetTitle, studyNotes, questionsArray);
    console.log("done");
    setPage("allStudySets")
  }

  return (
    <>
      <h1>Create Study Set</h1>
      <form onSubmit={(e)=>{e.preventDefault()}} id="createStudySet">
        <h2>Title</h2>
        <input type="text" value={studySetTitle} onChange={(e)=>{setStudySetTitle(e.target.value)}}></input>
        <h2>Enter Study Notes</h2>
        <textarea id="studyNotesTextbox" rows="5" cols="40" value={studyNotes} onChange={(e)=>{setStudyNotes(e.target.value)}}></textarea>
        <h2>Number of Questions: {numQuestions}</h2>
        <input type="range" id="numQuestionsSlider" min="5" max="25" value={numQuestions} onChange={(e)=>{setNumQuestions(e.target.value)}}></input>
        <button id="createStudySetButton" onClick={createStudySet}>Create Study Set</button>
      </form>
    </>
  )
}

export default CreateStudySet
