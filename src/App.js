import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Options from "./components/options"
const shuffleArray = (array) =>
  [...array].sort(() => Math.random() - 0.5);
  

function App() {
  const [questions, setQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState('easy')
  const [quizArray, setQuizArray] = useState([])
  const [gameType, setGameType] = useState('multiple')
  const [counter, setCounter] = useState(0)
  const [finishGame, setFinishGame] = useState(false)
  const [index, setIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [previousResults, setPreviousResults] = useState([])
  const [userAnswerResults, setUserAnswerResults] = useState({})
  const handleQuestions = (e) =>{
    setQuestions(e.target.value)
  }
  console.log(questions)
  const handleDifficulty = (e) =>{
    setDifficulty(e.target.value)

  }
  console.log(difficulty)
  const startGame = async () =>{
    let res = await fetch(`https://opentdb.com/api.php?amount=${questions}&difficulty=${difficulty}&type=${gameType}`)
    let result = await res.json();
    setQuizArray(
      result.results.map((question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer
        ])
      })))
      setGameStarted(true)
      setFinishGame(false)
      setIndex(0)
      setCounter(0)

  }
  console.log(quizArray)

  

  const handleGameType = (e) =>{
    setGameType(e.target.value)
    console.log(e.target.value)

  }

  const finishQuiz = () => {
    setFinishGame(true)
    setPreviousResults(previous=>[...previous, `${counter}/${quizArray.length}`])
    setUserAnswerResults({})
   
  }

  const nextQuestion = () => {
    
    if(quizArray.length > index + 1){
      setIndex(index => index + 1)
    }
  }


  const prevQuestion = () => {
    if(index > 0){
      setIndex(index=> index - 1)
    }
  }

  const checkAnswer = (answer) => {
    let copyUserAnswerResults = {...userAnswerResults}
    copyUserAnswerResults[index] = true
    if (quizArray[index].correct_answer === answer) {
      setCounter((counter)=> counter + 1)
    }
    setUserAnswerResults({...copyUserAnswerResults})
  }

 
  return (
    <div className="container">
      <ul class="list-group">
      <li class="list-group-item">   
     <label>How many questions?</label>
     </li>
     <li class="list-group-item">
     <select onChange={handleQuestions}>
       <option value={10}>10</option>
       <option value={15}>15</option>
       <option value={20}>20</option>
       </select> 
       </li>
       <li class="list-group-item">
       <label>Difficuly</label>
       </li>
       <li class="list-group-item">
       <select value={difficulty} onChange={handleDifficulty}>
         <option value='easy'>Easy</option>
         <option value='medium'>Medium</option>
         <option value='hard'>Hard</option>
       </select>
      </li>
      <li class="list-group-item">
       <select value ={gameType} onChange={handleGameType}>
         <option value='multiple'>Multiple Choice</option>
         <option value='boolean'>True/False</option>
       </select>
      </li>
      <li class="list-group-item">
       <button onClick={startGame}>Start game</button>
      
      <div>Last results: {previousResults?.map(item=><div>{item}</div>)} </div>
       
       
       {gameStarted && !finishGame &&
       
          <Options
          category={quizArray[index].category}
          question={quizArray[index].question}
          correctAnswer={quizArray[index].correct_answer}
          answers={quizArray[index].answers}
          setCounter={setCounter}
          setCurrentQuestion={setCurrentQuestion}
          userAnswered={userAnswerResults[index]}
          checkAnswer={checkAnswer}
          
          />
       }
       {index > 0 && 
        <button onClick={prevQuestion}>Previous question</button>}
       {quizArray.length - 1 > index && 
        <button onClick={nextQuestion}>Next question</button>  
       } 
       </li>
       <li class="list-group-item">
       <button type="submit" onClick={finishQuiz}>Finish Quiz</button>
       {{finishGame} && <div>Your result is {counter}</div>}

      </li>
     

     </ul>
    </div>
  );
}

export default App;