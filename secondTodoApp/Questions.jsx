import { useEffect, useState } from 'react'

function Questions() {

    const questions = 
    [
        {
            id: 101,
            question: "What is the capital of France?",
            answer: "Paris",
            options: ["London", "Berlin", "Madrid", "Paris"]
        },
        {
            id: 205,
            question: "What is the capital of Germany?",
            answer: "Berlin",
            options: ["London", "Berlin", "Madrid", "Paris"]
        }
    ]

    const [userAnswers, setUserAnswers] = useState({});

    function checkAnswers() {
        let currentScore = 0;

        questions.forEach((q) => {
            let component = document.getElementById(`questionID-${q.id}`);
            let questionTitle = component.children[0];
            if(userAnswers[q.id] === q.answer) {
                currentScore++;
                questionTitle.setAttribute('style', 'color: green')
                for(let i = 2; i < 6; i++) {
                    let questionOption = component.children[i];
                    if(questionOption.textContent.trim() === q.answer) {
                        questionOption.setAttribute('style', 'color: green')
                    }
                    console.log(i);
                }
            } else {
                questionTitle.setAttribute('style', 'color: red')
            }
        })

        alert(currentScore);
    }

    function handleOptionChange(questionID, option) {
        setUserAnswers({...userAnswers,
            [questionID]: option
        })
    }

  return (
    <>
      <h1>
        Questions
      </h1>
        {
            questions.map((element, questionIndex)=>{
                return <div key={element.id} className="question" id={`questionID-${element.id}`}>
                            <h2>{element.question}</h2>
                            <h3>{element.answer}</h3>
                            
                            {
                                element.options.map((answerOption, optionIndex) => {
                                    return (
                                        <label key={optionIndex}>
                                            <input
                                                type="radio"
                                                name={`question-${element.id}`} 
                                                value={answerOption}
                                                onChange={()=>{handleOptionChange(element.id, answerOption)}}
                                            />
                                            {answerOption}
                                        </label>
                                    )
                                })
                            }

                        </div>
            })

        }
        <button id="submitAnswers" onClick={checkAnswers}>Submit</button>
    </>
  )
}

export default Questions
