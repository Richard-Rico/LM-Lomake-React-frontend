/* eslint-disable jsx-a11y/alt-text */
import '../App.css'
import React, {useState} from 'react'
import LoginService from '../services/Auth'
import md5 from 'md5'
import PasswordChecklist from "react-password-checklist"
import logo from '../assets/Img/logo.png'
import Button from 'react-bootstrap/Button'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser, setAdmin}) => {

// Komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [passwordAgain, setPasswordAgain] = useState("")


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        username: username,
        password: md5(password) // Salataan md5 kirjaston metodilla       
    }

    // Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
        if (response.status === 200) {
     
        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.username)
        if (response.data.accesslevelId == 1)
        {
          setAdmin(true)
        }

       setMessage(`Logged in as: ${userForAuth.username}`)       
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 


  return (
    <div id="loginWindow">
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <img src={logo} />

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={username} placeholder="Käyttäjätunnus" maxLength="5" minLength="5"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Salasana"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div>
                <input name="confirmPassword" type="password" value={passwordAgain} placeholder="Vahvista salasana"
                    onChange={({ target }) => setPasswordAgain(target.value)} />
                
                 <PasswordChecklist 
				            rules={["minLength","match"]}
				            minLength={4}
				            value={password}
				            valueAgain={passwordAgain}
				            messages={{
                      minLength: "Salasanassa on vähintään 4 merkkiä.",
                      match: "Salasana vahvistettu.",
                    }}
                    />             
                  
            </div>
            <Button type='submit' onClick={() => Login()} variant="outline-success">Kirjaudu sisään</Button>{' '}  
            <Button  onClick={() => emptyFields()} variant="outline-warning">Tyhjennä</Button>
            
       </form>
       <br></br>
       <br></br>
       <hr></hr>

    </div>
  )
}

export default Login
