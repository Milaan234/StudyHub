import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react'


function QuizQuestion({question, userAnswers, setUserAnswers, id, index}) {

    const [shuffledAnswerOptions, setShuffledAnswersOptions] = useState([]);
    useEffect(() => {
        function loadQuestions() {
            const shuffledAnswerOptions = shuffleArray(question.options);
            setShuffledAnswersOptions(shuffledAnswerOptions);
        }
        loadQuestions();
    }, [question]);

    function shuffleArray(originalArray) {
        let originalArrayCopy = [...originalArray];
        let newArray = [];
        while(originalArrayCopy.length > 0) {
            const index = Math.floor(Math.random() * originalArrayCopy.length);
            newArray.push(originalArrayCopy[index]);
            originalArrayCopy.splice(index, 1);
        }
        return newArray;
    }
  
    function handleOptionChange(questionID, answerOption) {
        setUserAnswers({...userAnswers,
            [questionID]: answerOption
        })
    }

    return (
        <Card id={id}  className="mb-4 border-1 rounded-4">
            <Card.Header className="bg-light border-bottom-0 rounded-4">
                <h3 className="questionTitle" style={{ fontSize: '20px' }}>{index + 1}. {question.question}</h3>

            </Card.Header>
            <Card.Body>
                {shuffledAnswerOptions && shuffledAnswerOptions.map((answerOption) => {
                    return <div key={answerOption} className="mb-2">
                        <label>
                            <input
                                type="radio"
                                name={`question-${question.id}`} 
                                value={answerOption}
                                onChange={()=>{handleOptionChange(question.id, answerOption)}}
                                style={{ marginRight: '6px' }}
                            />
                            <span className='questionOption' style={{ fontSize: '17px' }}>{answerOption}</span>
                        </label>
                    </div>
                })}
            </Card.Body>
        </Card>
    )
}

export default QuizQuestion
