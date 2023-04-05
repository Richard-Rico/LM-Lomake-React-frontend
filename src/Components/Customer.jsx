import '../App.css'
import React, { useState } from 'react'
import CustomerService from '../services/Customer'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import { useRef } from 'react'


// props on nimeltään customer
const Customer = ({ customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {

    // Komponentin tilan määritys    
    const scollToCustomers = useRef();
    // statickBackdrop
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Haluatko poistaa esitietolomakkeen, ${customer.companyName}?`)

        if (vastaus === true) {
            CustomerService.remove(customer.customerId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Successfully removed customer ${customer.companyName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        // Ilmoituksen piilotus
                        setTimeout(() => {
                            setShowMessage(false)
                        },
                            5000
                        )
                        reloadNow(!reload)
                    }

                }
                )
                .catch(error => {
                    setMessage(error.message)
                    setIsPositive(false)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 6000)
                })

        } // Jos poisto halutaankin perua
        else {
            setMessage('Poisto peruttu.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

            // Ilmoituksen piilotus
            setTimeout(() => {
                setShowMessage(false)
            },
                5000
            )
        }
    }

    return (
        <div className='customerDiv'>

{/* ----- Show Esitietolomake ----- */}

                <Row>
                  <Col></Col>
                  <Col xs={4}>
                    <ListGroup>
                        <ListGroup.Item onClick={() => handleShow(!show)}>{customer.companyName}</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col></Col>
                </Row>

{/* ----- Esitietolomake ----- */}

            {show && <div>

                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}>
                    <div ref={scollToCustomers}></div>
                    
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                       
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Esitietolomake</Modal.Title>
                            <Form.Label>{customer.companyName}</Form.Label>                            
                        </Modal.Header>

                        <Modal.Body>

                            <Container>
                                <Col xs={20}>
                                    <br></br>
                                    <br></br>
                                    <form className="Formtext">

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Nimi</Form.Label>
                                                <InputGroup.Text>{customer.companyName}</InputGroup.Text>                                                
                                            </Form.Group>

                                            <Form.Group as={Col}>                                            
                                                <Form.Label>ID</Form.Label>
                                                <InputGroup.Text>{customer.customerId}</InputGroup.Text>                                                
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Vauvan ikä</Form.Label>
                                                <InputGroup.Text>{customer.vauvaIka}</InputGroup.Text>
                                                
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Synnytys raskausviikolla</Form.Label>
                                                <InputGroup.Text>{customer.synnytysViikko}</InputGroup.Text>
                                            </Form.Group>
                                        </Row>

                                        <Accordion defaultActiveKey="1">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Synnytyksen kulku</Accordion.Header>
                                                    <Accordion.Body>
                                                    {customer.synnytysResume}
                                                    </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>

                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Imetyshaasteet</Accordion.Header>
                                                    <Accordion.Body>
                                                    {customer.synnytysHaaste}
                                                    </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Osoite</Form.Label>
                                                <InputGroup.Text>{customer.address}</InputGroup.Text>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Postinumero</Form.Label>
                                                <InputGroup.Text>{customer.postalCode}</InputGroup.Text>                                                
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Kaupunki</Form.Label>
                                                <InputGroup.Text>{customer.city}</InputGroup.Text>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Puhelinnumero</Form.Label>
                                                <InputGroup.Text>{customer.phone}</InputGroup.Text>                                                
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Ovikoodi / Summeri</Form.Label>
                                                <InputGroup.Text>{customer.fax}</InputGroup.Text>                                                
                                            </Form.Group>
                                        </Row>
                                        <br></br>
                                        <br></br> 
                                        <Button variant="outline-danger" size="sm" onClick={() => deleteCustomer(customer)}>Poista</Button>
                                    </form>
                                </Col>                                
                            </Container>                           
                            
                        </Modal.Body>                      

                        <Modal.Footer> 
                            <Button variant="outline-success" onClick={() => editCustomer(customer)}>Muokkaa</Button>                   
                            <Button variant="outline-dark" onClick={() => setShow(false)}>Sulje</Button> 
                                                      
                        </Modal.Footer>
                    </Modal.Dialog>
                    </Modal> 
                </div>

               
             </div>}
        </div>
    )
}

export default Customer