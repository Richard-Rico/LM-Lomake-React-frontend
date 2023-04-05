/* eslint-disable no-unused-vars */
import '../App.css'
import React, {useState} from 'react'
import UserService from '../services/User'
import md5 from 'md5'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useRef } from 'react'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys
const scollToLomake = useRef();

const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstName)
const [newLastname, setNewLastname] = useState(muokattavaUser.lastName)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword, setNewPassword] = useState(muokattavaUser.password)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      userId: newUserId,
      firstName: newFirstname,
      lastName: newLastname,
      email: newEmail,
      accesslevelId: parseInt(newAccesslevelId),
      username: newUsername,
      password: md5(newPassword) // Salataan md5 kirjaston metodilla
  }
    
    UserService.update(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + newUser.firstName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
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


  return (
    // ----- User edit ----- //
    <div id="addNew">
      <div ref={scollToLomake}></div>
      <p>Imetysohjaus</p>
      <h2>Edit Käyttäjä</h2>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <br></br>
            <br></br>
            <div className="ButtonR">
              <Button onClick={() => setMuokkaustila(false)} variant="outline-danger">Sulje</Button>
            </div>

            <form onSubmit={handleSubmit} className="Formtext">

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Etunimi</Form.Label>
                  <Form.Control value={newFirstname} placeholder="Etunimi"
                    onChange={({ target }) => setNewFirstname(target.value)} required
                    onClick={() => scollToLomake.current.scrollIntoView()} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Sukunimi</Form.Label>
                  <Form.Control value={newLastname} placeholder="Sukunimi"
                    onChange={({ target }) => setNewLastname(target.value)} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Sähköposti</Form.Label>
                  <Form.Control value={newEmail} placeholder="Sähköposti"
                    onChange={({ target }) => setNewEmail(target.value)} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Access level Id</Form.Label>
                  <Form.Control value={newAccesslevelId} placeholder="1-3"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Käyttäjätunnus</Form.Label>
                  <Form.Control value={newUsername} disabled />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Salasana</Form.Label>
                  <Form.Control value={newPassword} placeholder="Salasana"
                    onChange={({ target }) => setNewPassword(target.value)} required />
                </Form.Group>
              </Row>

              <br></br>
              <div className='div'>
                <Button type='submit' variant="outline-success">Lisätä</Button>
              </div>

              <br></br>
              <br></br>

            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>
  )
}

export default UserEdit
