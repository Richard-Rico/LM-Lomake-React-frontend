import '../App.css'
import React, { useState } from 'react'
import UserService from '../services/User'
import md5 from 'md5'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useRef } from 'react'

const UserAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  // Komponentin tilan määritys
  const scollToLomake = useRef();
  // Id arvo määritellään tietokannassa automaattisesti,
  // emme anna sitä itse
  const [newFirstname, setNewFirstname] = useState('')
  const [newLastname, setNewLastname] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newAccesslevelId, setNewAccesslevelId] = useState(2)
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')


  // onSubmit tapahtumankäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      accesslevelId: parseInt(newAccesslevelId),
      username: newUsername,
      password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }

    console.log(newUser)

    UserService.create(newUser)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setLisäystila(false)
        }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }


  return (
    // ----- User add ----- //
    <div id="addNew">
      <div ref={scollToLomake}></div>
      <p>Luna Mama</p>
      <h2>Käyttäjä</h2>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <br></br>
            <br></br>
            <div className="ButtonR">
              <Button onClick={() => setLisäystila(false)} variant="outline-danger">Sulje</Button>
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
                  <Form.Control value={newUsername} placeholder="(5) kirjaimet (isolla kirjaimella)" maxLength="5" minLength="5"
                    onChange={({ target }) => setNewUsername(target.value)} required />
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

              <p>* Muista, että et voi lisätä uutta käyttäjää olemassa olevalla käyttäjätunnuksella.</p>

              <br></br>

            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>

  )
}

export default UserAdd
