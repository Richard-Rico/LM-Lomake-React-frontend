/* eslint-disable array-callback-return */
import '../App.css'
import React, { useState, useEffect } from 'react'
import CustomerService from '../services/Customer'
import Customer from '../Components/Customer'
import CustomerAdd from '../Components/CustomerAdd'
import CustomerEdit from '../Components/CustomerEdit'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useRef } from 'react'


const CustomerList = ({ setMessage, setIsPositive, setShowMessage, admin }) => {

  // Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.

  const scollToCustomers = useRef();
  const [customers, setCustomers] = useState([])
  const [showCustomers, setShowCustomers] = useState(false)
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
  const [search, setSearch] = useState("")

  // UseEffect ajetaan aina alussa kerran
  useEffect(() => {

    const token = localStorage.getItem('token')
    CustomerService
      .setToken(token)

    CustomerService.getAll()
      .then(data => {
        setCustomers(data)
      })
  }, [lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
  }

  const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
  }

  return (

    // ----- Asiakkat Esitietolomake ----- //
    <>
      <h4><nobr style={{ cursor: 'pointer' }}
        onClick={() => setShowCustomers(!showCustomers)}></nobr></h4>
      {!lisäystila && <Button size="lg" variant="outline-dark" onClick={() => setShowCustomers(!showCustomers)}>Asiakkaat</Button>}

      <br></br>
      <br></br>

      {/* ----- ADD Asiakkat Esitietolomake ----- */}
      {/* {!lisäystila && <Button variant="outline-success" onClick={() => setLisäystila(true)}>Täytä esitietolomake</Button>}
                <br></br>
                <br></br> */}

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

      {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
      />}

      {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaCustomer={muokattavaCustomer}
      />}

      <br></br>
      <br></br>
      <div ref={scollToCustomers}></div>
      {
        admin && !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => {
          const lowerCaseName = c.companyName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return (
              <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
              />
            )
          }
        }
        )
      }

    </>
  )
}

export default CustomerList
