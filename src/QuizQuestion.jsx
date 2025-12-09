import { useEffect, useState } from 'react'


function QuizQuestion({question, userAnswers, setUserAnswers, id}) {

  
    function handleOptionChange(questionID, answerOption) {
        setUserAnswers({...userAnswers,
            [questionID]: answerOption
        })
    }

    return (
        <div id={id}>
        <h3 className="questionTitle">{question.question}</h3>
        {question.options.map((answerOption) => {
            return <div key={answerOption}>
                <label>
                    <input
                        type="radio"
                        name={`question-${question.id}`} 
                        value={answerOption}
                        onChange={()=>{handleOptionChange(question.id, answerOption)}}
                    />
                    <span className='questionOption'>{answerOption}</span>
                </label>
            </div>
        })}
        </div>
    )
}

export default QuizQuestion
