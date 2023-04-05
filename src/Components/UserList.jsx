/* eslint-disable array-callback-return */

import '../App.css'
import React, { useState, useEffect } from 'react'
import UserService from '../services/User'
import UserAdd from '../Components/UserAdd'
import UserEdit from '../Components/UserEdit'
import User from '../Components/User'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const UserList = ({ setMessage, setIsPositive, setShowMessage }) => {

  // Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaUser, setMuokattavaUser] = useState(false)
  const [search, setSearch] = useState("")

  // UseEffect ajetaan aina alussa kerran
  useEffect(() => {
    UserService.getAll()
      .then(data => {
        setUsers(data)
      })
  }, [lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
  }
  return (
    <>
      <h4><nobr style={{ cursor: 'pointer' }}
        onClick={() => setShowUsers(!showUsers)}></nobr></h4>
      {!lisäystila && <Button size="lg" variant="outline-dark" onClick={() => setShowUsers(!showUsers)}>Käyttäjät</Button>}

      <br></br>
      <br></br>

      {!lisäystila && <Button variant="outline-success" onClick={() => setLisäystila(true)}>Lisää uusi</Button>}
      <br></br>
      <br></br>

      {!lisäystila && <Row>
        <Col></Col>
        <Col xs={4}>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
            <Form.Control
              placeholder="Hae nimellä"
              value={search} onChange={handleSearchInputChange} />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>}

      <br></br>
      <br></br>


      {lisäystila && <UserAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
      />}

      {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaProduct={muokattavaUser}
      />}

      {
        !lisäystila && !muokkaustila && showUsers && users && users.map(u => {
          const lowerCaseName = u.username.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return (
              <User key={u.userId} user={u} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editUser={editUser}
              />
            )
          }
        }
        )
      }

    </>
  )

}

export default UserList
