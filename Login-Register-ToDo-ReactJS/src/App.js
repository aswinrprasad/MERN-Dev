import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import userDets from './components/userList'
import TodoHome from './components/TodoHome'
import {Link} from 'react-router-dom'
function App(){
  const [userList, addUser] = useState(userDets)
  const [userPos, setUserPos] = useState(0)




  const setTask = (tasks) => {
    let pos = 0
    addUser(() => {
      const newUser = userList.map(user => {
        if(pos === userPos) {
          user.tasks = tasks
        }
        pos+=1
        return user
      })
      return newUser
    })
  }

  const setUser = () => {
    let pos = 0
    addUser(() => {
      const newUser = userList.map(user => {
        if(pos === userPos) {
          user.isLogged = !user.isLogged
        }
        pos+=1
        return user
      })
      return newUser
    })
  }
  console.log(userList)
  console.log(`User pos is : ${userPos}`)

  return (
    <Router>
      <div className="main">
        <Navbar isLogged={userList[userPos].isLogged} setUser={setUser}/>
        
        <Home userList={userList} addUser={addUser} userPos={userPos} setUserPos={setUserPos}/>
        <Switch>
          <Route path="/todohome" exact render={() => {
            if(userList[userPos].isLogged === true)
              return <TodoHome tasks={userList[userPos].tasks} setTask={setTask}/>
            else
              return (
                <div style={{height:"100vh", display: "flex", justifyContent:"center", alignItems: "center", flexDirection:"column"}}>
                  <h2>Please Login again</h2>
                  <Link to="/">
                    <input className="btn btn-large btn-info" type="button" value="Login"/>
                  </Link>
                </div>
              )
            } 
          } />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App