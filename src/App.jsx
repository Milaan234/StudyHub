import './App.css';
import { useEffect, useReducer, useState } from 'react';
import {auth, onAuthStateChanged} from "./firebase.js";
import NavBar from './NavBar';
import PracticeQuiz from './PracticeQuiz';
import AllStudySets from './AllStudySets.jsx';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage.jsx';
import LogoutButton from './LogoutButton.jsx';
import CreateStudySet from './CreateStudySet.jsx';
import StudySetDetails from './StudySetDetails.jsx';

function App() {

  const [page, setPage] = useState("signup");
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPracticeQuiz, setCurrentPracticeQuiz] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [studySets, setStudySets] = useState([]);
  const [currentStudySet, setCurrentStudySet] = useState(null);

  useEffect(() => {
    const loginMechanism = onAuthStateChanged(auth, (user)=>{
      if(user) {
        setLoggedIn(true);
        setPage("allStudySets");
        setUserUID(user.uid);
      } else {
        setLoggedIn(false);
        setPage("login");
        setUserUID(null);
      }
    });
    return () => loginMechanism();
  }, []);

  

  return (
    <>
      {(loggedIn && (page!=="login" && page!=="signup" && page!=="practiceQuiz")) && <NavBar setPage={setPage} />}
      {(!loggedIn && page==="login") && <LoginPage setLoggedIn={setLoggedIn} setPage={setPage} />}
      {(!loggedIn && page==="signup") && <SignupPage setLoggedIn={setLoggedIn} setPage={setPage} />}
      {(loggedIn && page==="createStudySet") && <CreateStudySet setPage={setPage} userUID={userUID}/>}
      {(loggedIn && (page==="practiceQuiz" && currentPracticeQuiz)) && <PracticeQuiz questions={currentPracticeQuiz} setPage={setPage} />}
      {(loggedIn && page==="allStudySets") && <AllStudySets setCurrentPracticeQuiz={setCurrentPracticeQuiz} setPage={setPage} userUID={userUID} studySets={studySets} setStudySets={setStudySets}  setCurrentStudySet={setCurrentStudySet}/>}
      {(loggedIn && (page==="studySetDetails" && currentStudySet)) && <StudySetDetails studySet={currentStudySet} userUID={userUID} setPage={setPage} setCurrentPracticeQuiz={setCurrentPracticeQuiz}/>}
      {loggedIn && <LogoutButton/>}
    </>
  )
}

export default App
