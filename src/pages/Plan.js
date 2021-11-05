import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import TodoList from '../components/TodoList'
import Header from  '../components/Header'
import { Button, Card } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Plan() {

  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("today")
  const [filteredTodos, setFilteredTodos] = useState([])
  const [startDate, setStartDate ] = useState(new Date())
  const [endDate, setEndDate ] = useState(new Date())


  function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(
          todos.filter(todo => todo.completed === true)
        )
      break
      case 'uncompleted':
        setFilteredTodos(
          todos.filter(todo => todo.completed === false)
        )
      break
      case 'search':
        let start = daysIntoYear(startDate)
        let end = daysIntoYear(endDate)
        setFilteredTodos(
          
          todos.filter((todo) => {
            let c = daysIntoYear(new Date(todo.createdAt))
            return(
            ((start <= c) && (c <= end))
            )
          })
        )
      break
      case 'all':
        setFilteredTodos(todos)
      break
      default:
        setFilteredTodos(
        todos.filter((todo) => {
          let c = daysIntoYear(new Date(todo.createdAt))
          return(
          (c === daysIntoYear(new Date()))
          )
        })
      )
      break
  } 
}


useEffect(() => {
  getLocalTodos()
},[])

  useEffect(() => {
    filterHandler();
    saveLocalTodos()
  },[ todos, status, startDate, endDate, daysIntoYear(new Date()) ])

  const saveLocalTodos = () =>{
    
      localStorage.setItem('todos',JSON.stringify(todos))

  }

  const getLocalTodos = () =>{
    if (localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  }

  return ( 
     <>
          <Header />
          <div id="wrapper"
          style={{
            padding: '0 30px',
            margin: '0 auto',}}
          >
          <Card style={{
            padding: '50px',
            margin: '0 auto',
            display: 'flex',
            flexDirection:'column',
            justifyContent:'right',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',

          }}>
            <h2>1. Choose a Task. For example, a school assignment or project</h2>
            <h2>2. Break task into 10-minute sub-tasks, and add them to the list</h2>
            <h2>3. Use that Timer. <side>Happy Productivity!</side></h2>         
          </Card>
          <Form 
          inputText={inputText} 
          setInputText={setInputText} 
          todos={todos} 
          setTodos={setTodos} 
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate} 
          setEndDate={setEndDate}
          setStatus={setStatus} />
          <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          filteredTodos={filteredTodos} />
        </div>
          <div className="madeBy">
            <Link to={{ pathname: "https://ayusuf-sps-spring21.uc.r.appspot.com" }} target="_blank">
              <Button>Made with ❤️ by Yusuf Abdulmueez</Button>
            </Link>
          </div>
    </>
    
  );
}

export default Plan;
