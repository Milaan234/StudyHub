import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

import { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import { Button } from 'react-bootstrap';

function Flashcards({studySetTitle, flashcardsData}) {

    const [shuffledFlashcards, setshuffledFlashcards] = useState([]);

    useEffect(() => {
        function loadFlashcards() {
                const shuffledFlashcards = shuffleArray(flashcardsData);
                setshuffledFlashcards(shuffledFlashcards);
            }
            loadFlashcards();
        }, [flashcardsData]);

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
    
    return (
        <>
        <Container  style={{maxWidth:"1000px"}}>
            <h1 style={{marginLeft:"20px", marginTop:"40px", color:"#003366"}}>Flashcards: {studySetTitle}</h1>

            <Carousel variant='dark' interval={null} style={{marginTop:"70px"}}> 
                {shuffledFlashcards && shuffledFlashcards.map((flashcard, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <Flashcard index={index} flashcardContent={flashcard} />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </Container>
        </>
    )
}

export default Flashcards
