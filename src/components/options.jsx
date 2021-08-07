import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'


const Options = ({category, question, answers, correctAnswer, setCounter, userAnswered, checkAnswer}) =>{
   


    return(<>
    <div></div>
    <div><b>{category}</b></div>
    <div>{question}</div>
    <div>
    <li class="list-group-item">
    {answers.map((answer)=>
    <button disabled={userAnswered} onClick={()=>checkAnswer(answer)}>{answer}</button>)}
    </li>
    </div>
    </>

    )
}

export default Options