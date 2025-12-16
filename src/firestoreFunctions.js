import {app, auth, db, updateProfile, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, collection, writeBatch, getDocs, deleteDoc, getDocsFromServer} from './firebase';

export async function saveStudySetToDB(userUID, studySetID, title, notes, questions, flashcards, enhancedNotes) {
    if(!userUID) return;

    try {
        const batch = writeBatch(db);
        const studySetRef = doc(db, "users", userUID, "studySets", String(studySetID));
        batch.set(studySetRef, {
            createdAt: new Date(),
            title: title,
            practiceQuizLength: questions.length,
            flashcardsLength: flashcards.length
        }, {merge: true})
        const notesRef = doc(db, "users", userUID, "studySets", String(studySetID), "notes", "userNotes");
        batch.set(notesRef, {content: notes})

        questions.forEach(question => {
            const questionID = crypto.randomUUID();
            const questionRef = doc(db, "users", userUID, "studySets", String(studySetID), "questions", String(questionID));
            batch.set(questionRef, {
                question: question.question,
                answer: question.answer,
                options: question.options
            });
        });

        flashcards.forEach(flashcard => {
            const flashcardID = crypto.randomUUID();
            const flashcardRef = doc(db, "users", userUID, "studySets", String(studySetID), "flashcards", String(flashcardID));
            batch.set(flashcardRef, {
                front: flashcard.front,
                back: flashcard.back
            })
        })

        const enhancedNotesRef = doc(db, "users", userUID, "studySets", String(studySetID), "notes", "enhancedNotes");
        batch.set(enhancedNotesRef, {content: enhancedNotes})
        
        await batch.commit();
        console.log("Saved");
    } catch(error) {
        alert("Error saving to DB");
        console.log("Error saving to DB ", error);
    }
}

export async function savePracticeQuizResultToDB(userUID, studySetID, score, total) {
    if(!userUID) return;

    try {
        const time = Date.now().toString();
        const resultsRef = doc(db, "users", userUID, "studySets", String(studySetID), "results", time);
        await setDoc(resultsRef, {
            score: score,
            totalQuestions: total,
            time: new Date(),
        }, {merge: true})
        console.log("Added result to DB");
    } catch(error) {
        alert("Error saving result to DB");
        console.log("Error saving result to DB ", error);
    }
}

export async function getStudySetsFromDB(userUID) {
    if(!userUID) return [];

    try {
        const studySetsRef = collection(db, "users", userUID, "studySets");
        const snapshot = await getDocs(studySetsRef);
        const studySets = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        return studySets;
    } catch(error) {
        alert("Error retrieving from DB");
        console.log("Error retrieving from DB ", error);
        return [];
    }
}

export async function getStudyNotesFromDB(userUID, studySetID) {
    if(!userUID || !studySetID) return "";

    try {
        const studySetsRef = doc(db, "users", userUID, "studySets", studySetID, "notes", "userNotes");
        const snapshot = await getDoc(studySetsRef);
        if(snapshot.exists()) {
            return snapshot.data().content;
        } else {
            return "No notes found.";
        }
    } catch(error) {
        console.log("Error retrieving notes from DB: ", error);
        return "";
    }
}

export async function getPracticeQuizFromDB(userUID, studySetID) {
    if(!userUID || !studySetID) return;

    try {
        const questionsRef = collection(db, "users", userUID, "studySets", String(studySetID), "questions");
        const snapshot = await getDocs(questionsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch(error) {
        alert("Error retrieving questions!");
        console.log("Error retreiving questions: ", error);
    }

}


export async function getFlashcardsFromDB(userUID, studySetID) {
    if(!userUID || !studySetID) return;

    try {
        const flashcardsRef = collection(db, "users", userUID, "studySets", String(studySetID), "flashcards");
        const snapshot = await getDocs(flashcardsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch(error) {
        alert("Error retrieving flashcards!");
        console.log("Error retreiving flashcards: ", error);
    }

}

export async function getPracticeQuizResultsFromDB(userUID, studySetID) {
    if(!userUID || !studySetID) return;

    try {
        const resultsRef = collection(db, "users", userUID, "studySets", String(studySetID), "results");
        const snapshot = await getDocs(resultsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch(error) {
        alert("Error retrieving results!");
        console.log("Error retreiving results: ", error);
    }

}

export async function getEnhancedNotesFromDB(userUID, studySetID) {
    if(!userUID || !studySetID) return "";

    try {
        const studySetsRef = doc(db, "users", userUID, "studySets", studySetID, "notes", "enhancedNotes");
        const snapshot = await getDoc(studySetsRef);
        if(snapshot.exists()) {
            return snapshot.data().content;
        } else {
            return "No enhanced notes found.";
        }
    } catch(error) {
        console.log("Error retrieving enhanced notes from DB: ", error);
        return "";
    }
}

export async function deleteStudySetFromDB(userUID, studySetID) {
    try {
        console.log("Starting full clean delete...");
        
        const batch = writeBatch(db);

        const resultsRef = collection(db, "users", userUID, "studySets", String(studySetID), "results");
        const resultsSnapshot = await getDocsFromServer(resultsRef);
        resultsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        const questionsRef = collection(db, "users", userUID, "studySets", String(studySetID), "questions");
        const questionsSnapshot = await getDocsFromServer(questionsRef);
        questionsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        const flashcardsRef = collection(db, "users", userUID, "studySets", String(studySetID), "flashcards");
        const flashcardsSnapshot = await getDocsFromServer(flashcardsRef);
        flashcardsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        const notesRef = doc(db, "users", userUID, "studySets", String(studySetID), "notes", "userNotes");
        batch.delete(notesRef);
        const enhancedNotesRef = doc(db, "users", userUID, "studySets", String(studySetID), "notes", "enhancedNotes");
        batch.delete(enhancedNotesRef);

        const studySetDocRef = doc(db, "users", userUID, "studySets", String(studySetID));
        batch.delete(studySetDocRef);

        await batch.commit();
        
        console.log("Full delete successful!");

    } catch(error) {
        alert("Error deleting study set!");
        console.error("Error deleting from DB: ", error);
        throw error;
    }
}

export async function setInitialUserData(user, userEmail, userName) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            userEmail: userEmail,
            displayName: userName,
            userGeminiAPIKey: "",
            lastDefaultAPIUse: new Date(0)
        })
        alert("Account created!");
    } catch(error) {
        alert("Error saving initial user data");
        console.log("Error saving initial user data: ", error);
        throw error;
    }
}

export async function updateUserName(user, userName) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            displayName: userName
        }, { merge: true })
    } catch(error) {
        alert("Error saving user name to DB!");
        console.log("Error saving user name changes to DB: ", error);
        throw error;
    }
}

export async function updateUserEmail(user, userEmail) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            userEmail: userEmail
        }, { merge: true })
    } catch(error) {
        alert("Error saving user email to DB!");
        console.log("Error saving user email changes to DB: ", error);
        throw error;
    }
}

export async function updateUserAPIKey(user, userAPIKey) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            userGeminiAPIKey: userAPIKey
        }, { merge: true })
    } catch(error) {
        alert("Error saving user API key to DB!");
        console.log("Error saving user API key changes to DB: ", error);
        throw error;
    }
}

export async function updateLastDefaultAPIUse(user) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            lastDefaultAPIUse: new Date()
        }, { merge: true })
    } catch(error) {
        alert("Error saving last default API use to DB!");
        console.log("Error saving last default API use changes to DB: ", error);
        throw error;
    }
}

export async function getUserEmail(user) {
    try {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if(userSnapshot.exists()) {
            return userSnapshot.data().userEmail || ""; 
        } else {
            return "";
        }
    } catch(error) {
        alert("Error getting email from DB!");
        console.log("Error getting email from DB: ", error);
        return "";
    }
}

export async function getUserName(user) {
    try {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if(userSnapshot.exists()) {
            return userSnapshot.data().displayName || ""; 
        } else {
            return "";
        }
    } catch(error) {
        alert("Error getting name from DB!");
        console.log("Error getting name from DB: ", error);
        return "";
    }
}

export async function getUserAPIKey(user) {
    try {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if(userSnapshot.exists()) {
            return userSnapshot.data().userGeminiAPIKey || ""; 
        } else {
            return "";
        }
    } catch(error) {
        alert("Error getting API Key from DB!");
        console.log("Error getting API Key from DB: ", error);
        return "";
    }
}

export async function getLastDefaultAPIUse(user) {
    try {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if(userSnapshot.exists()) {
            return userSnapshot.data().lastDefaultAPIUse || new Date(0); 
        } else {
            return new Date(0);
        }
    } catch(error) {
        alert("Error getting last default API use from DB!");
        console.log("Error getting last default API use from DB: ", error);
        return new Date(0);
    }
}
