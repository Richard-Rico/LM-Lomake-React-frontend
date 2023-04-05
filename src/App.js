/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerList from '../src/Components/CustomerList'
import LomakeList from './Components/LomakeList'
import Button from 'react-bootstrap/Button'
import UserList from '../src/Components/UserList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Message from './Components/Message'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../src/Components/Login'
import logo from '../src/assets/Img/logo.png'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  const [showMessage, setShowMessage] = useState('')
  const [loggedInUser, setLoggedInUser] = useState('')


  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }
  }, [])


  // Logout napin tapahtumankäsittelijä
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }

  return (
    <div className="App">

      <div> 
        {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}
      </div>


      {loggedInUser &&
        <Router>
          <Navbar bg="light" variant="light" className="justify-content-center" activeKey="/home">

            <Nav >
              <Nav.Item>
                <Link to={'/Lomake'} className='nav-link'>Lomake</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={'/Customers'} className='nav-link'>Asiakkaat</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={'/Users'} className='nav-link'>Käyttäjät</Link>
              </Nav.Item>

            </Nav>
            <div ><Button size="sm" onClick={() => logout()} variant="outline-dark">Kirjaudu ulos</Button></div>
          </Navbar>

          <img src={logo} />

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Switch>
            <Route path="/Lomake" > <LomakeList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} /></Route>

            <Route path="/Customers" > <CustomerList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} /></Route>

            <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} /></Route>
          </Switch>

        </Router>

      }
    </div>
  )
}

export default App
