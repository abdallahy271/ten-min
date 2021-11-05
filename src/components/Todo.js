import React,{ useState } from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import Timer from './Timer';
import { Button } from '@material-ui/core';


const Todo = ({todo, text, todos, setTodos}) => {

    const [ showTime, setShowTime ] = useState(false)
    const [ startOver, setStartOver ] = useState(false)
    const [ timerRunning, setTimerRunning ]  = useState(false);
    const [ colorChanger, setColorChanger ]  = useState("");
    const [ timeLimit, setTimeLimit ]  = useState(600);

    const showclassName = showTime ? 'show' : 'hide'
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }
    const TIMES = {
        five: 5,
        five_min: 300,
        ten: 10,
        ten_min: 600,
        fifteen: 15,
        fifteen_min: 900,
    }

    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return ({
                    ...item, completed:!item.completed
                })
            }
            return item
        } 
        ))
    }

    const editHandler = () => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return ({
                    ...item, isEditing:!item.isEditing
                })
            }
            return item
        } 
        ))
    }

    const editChangeHandler = (e) => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return ({
                    ...item, text: e.target.value
                })
            }
            return item
        }))
    }

    const editingList = (
        <>
        <input defaultValue={text} onChange={editChangeHandler} type="text" className="todo-input" />
        <button onClick={editHandler} className='edit-btn'>
            <i className="fas fa-save"></i>
        </button>
       

        </>
    )

    const showTimer = () => {
        setShowTime(!showTime)
    }

   

    const viewingList = (
        <>
        <li className = {`todo-item ${todo.completed ? 'completed' : ''}`}> {text} </li>
        <button onClick={showTimer} className={`timer-btn  ${colorChanger}`}> 
            <i className="fas fa-stopwatch"></i>        
        </button>
        <button onClick={completeHandler} className='complete-btn'> 
                <i className='fas fa-check'> </i>
        </button>
        <button onClick={editHandler} className='edit-btn'>
            <i className="fas fa-edit"></i>
        </button>

        
        </>
    )
        console.log(colorChanger)
    return(
        <div className="todo-wrapper">
            <div className='todo'>
                {todo.isEditing ? editingList : viewingList}
                
                <button onClick={deleteHandler} className='trash-btn'> 
                    <i className='fas fa-trash'> </i>
                </button>
            </div>
            <div className={`timer-wrapper ${showclassName}`}>
                <Timer startOver={startOver} setStartOver={setStartOver}
                timerRunning={timerRunning} setTimerRunning={setTimerRunning}
                setColorChanger={setColorChanger} 
                timeLimit={timeLimit} />
                <div className='button_container'>
                    <Button variant="contained" color='secondary' className="time_btn" onClick={(e)=>{e.preventDefault();setStartOver(true)}}>
                    Start Over
                    </Button>
                    <Button variant="contained" color='primary' className="time_btn" onClick={(e)=>{e.preventDefault();setTimerRunning(true)}}>
                    Begin
                    </Button>
                    <Button className="time_btn" onClick={()=>setTimeLimit(TIMES.five_min)}
                    variant="contained">{TIMES.five}</Button>
                    <Button className="time_btn" onClick={()=>setTimeLimit(TIMES.ten_min)}
                    variant="outlined">{TIMES.ten}</Button>
                    <Button className="time_btn" onClick={()=>setTimeLimit(TIMES.fifteen_min)}
                    variant="contained">{TIMES.fifteen}</Button>
           
                    </div>
            </div>
        </div>

    )

}

export default Todo;