import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

import { useEffect, useState } from 'react';

function Flashcard({index, flashcardContent}) {

    const [frontSide, setFrontSide] = useState(true);

    function flipFlashcard() {
        setFrontSide(!frontSide);
    }
    
    
    return (
        <>
            <div id={"flashcard-" + index} onClick={flipFlashcard} className="flashcard" style={{alignContent:"center", textAlign:"center", verticalAlign:"center", borderRadius:"15px", paddingLeft:"5rem", paddingRight:"5rem", minHeight:"400px", boxShadow:"10px"}}>
                <div className={`flashcard-inner ${!frontSide ? 'flipped' : ''}`}>
                    {/* {frontSide
                        ? <h1 id={"front-flashcard-" + index} className="flashcard-front" style={{color:"#003366"}}>{flashcardContent.front}</h1>
                        : <h3 id={"back-flashcard-" + index} className="flashcard-back" style={{color:"#003366"}}>{flashcardContent.back}</h3>
                    } */}
                        <div id={"front-flashcard-" + index} className="flashcard-front">
                            <h1 style={{color:"#003366"}}>{flashcardContent.front}</h1>
                        </div>
                        <div id={"back-flashcard-" + index} className="flashcard-back">
                            <h3 style={{color:"#003366"}}>{flashcardContent.back}</h3>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Flashcard
