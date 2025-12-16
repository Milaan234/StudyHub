import { useEffect, useState } from 'react';
import {auth, onAuthStateChanged} from "./firebase.js";
import NavBar from './NavBar';
import PracticeQuiz from './PracticeQuiz';
import AllStudySets from './AllStudySets.jsx';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage.jsx';
import CreateStudySet from './CreateStudySet.jsx';
import StudySetDetails from './StudySetDetails.jsx';
import './App.css';
import SettingsPage from './SettingsPage.jsx';
import { getUserName } from './firestoreFunctions.js';
import Flashcards from './Flashcards.jsx';

function App() {

  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPracticeQuiz, setCurrentPracticeQuiz] = useState(null);
  const [currentFlashcards, setCurrentFlashcards] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [studySets, setStudySets] = useState([]);
  const [currentStudySet, setCurrentStudySet] = useState(null);
  const [studySetTitle, setStudySetTitle] = useState("");
  const [studySetID, setStudySetID] = useState(null);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginMechanism = onAuthStateChanged(auth, (user)=>{
      if(user) {
        setUser(user);
        setUserUID(user.uid);
        const nameFromDB = getUserName(user);
        setUserName(nameFromDB);
        setLoggedIn(true);
        setPage("allStudySets");
      } else {
        setLoggedIn(false);
        setUserUID(null);
        setUser(null);
        setPage("login");
      }
    });
    return () => loginMechanism();
  }, []);

  

  return (
    <>
      {(loggedIn && (page!=="login" && page!=="signup" && page!=="practiceQuiz")) && <NavBar setPage={setPage} />}
      {(!loggedIn && page==="login") && <LoginPage setLoggedIn={setLoggedIn} setPage={setPage} />}
      {(!loggedIn && page==="signup") && <SignupPage setLoggedIn={setLoggedIn} setPage={setPage} />}
      {(loggedIn && page==="createStudySet") && <CreateStudySet setPage={setPage} userUID={userUID} user={user}/>}
      {(loggedIn && (page==="practiceQuiz" && currentPracticeQuiz)) && <PracticeQuiz questions={currentPracticeQuiz} setPage={setPage} page={page} studySetTitle={studySetTitle} userUID={userUID} studySetID={studySetID} />}
      {(loggedIn && page==="allStudySets") && <AllStudySets setCurrentPracticeQuiz={setCurrentPracticeQuiz} setPage={setPage} userUID={userUID} studySets={studySets} setStudySets={setStudySets}  setCurrentStudySet={setCurrentStudySet} setStudySetTitle={setStudySetTitle} setStudySetID={setStudySetID} userName={userName} setCurrentFlashcards={setCurrentFlashcards}/>}
      {(loggedIn && (page==="studySetDetails" && currentStudySet)) && <StudySetDetails studySet={currentStudySet} userUID={userUID} setPage={setPage} setCurrentPracticeQuiz={setCurrentPracticeQuiz} setStudySetTitle={setStudySetTitle} setStudySetID={setStudySetID} setCurrentFlashcards={setCurrentFlashcards}/>}
      {(loggedIn && page==="settingsPage") && <SettingsPage user={user}/>}
      {(loggedIn && page==="flashcards") && <Flashcards studySetTitle={studySetTitle} flashcardsData={currentFlashcards}/>}
    </>
  )
}

export default App
