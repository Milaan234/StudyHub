import {app, auth, db, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, collection, writeBatch, getDocs} from './firebase';

export async function saveStudySetToDB(userUID, studySetID, title, notes, questions) {
    if(!userUID) return;

    try {
        const batch = writeBatch(db);
        const studySetRef = doc(db, "users", userUID, "studySets", String(studySetID));
        batch.set(studySetRef, {
            createdAt: new Date(),
            title: title
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

        
        await batch.commit();
        console.log("Saved");
    } catch(error) {
        alert("Error saving to DB");
        console.log("Error saving to DB ", error);
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