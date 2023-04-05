import '../App.css'
import React, { useState } from 'react'
import UserService from '../services/User'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'


// props on nimeltään user
const User = ({ user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {

    // Komponentin tilan määritys
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Remove User ${user.username}`)

        if (vastaus === true) {
            UserService.remove(user.userId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Successfully removed user ${user.username}`)
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
            setMessage('Poisto peruttu onnistuneesti.')
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
        <div className='userDiv'>


            {/* ----- Show Käyttäjät ----- */}

            <Row>
                <Col></Col>
                <Col xs={4}>
                    <ListGroup>
                        <ListGroup.Item onClick={() => handleShow(!show)}>{user.firstname} {user.lastname}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col></Col>
            </Row>

            {/* ----- Esitietolomake ----- */}

            {show && <div>

                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}>

                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>

                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Käyttäjä</Modal.Title>
                                <Form.Label>{user.username}</Form.Label>
                            </Modal.Header>

                            <Modal.Body>

                                <Container>
                                    <Col xs={20}>
                                        <br></br>
                                        <br></br>
                                        <form className="Formtext">

                                            <Row className="mb-3">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Etunimi</Form.Label>
                                                    <InputGroup.Text>{user.firstname}</InputGroup.Text>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Label>Sukunimi</Form.Label>
                                                    <InputGroup.Text>{user.lastname}</InputGroup.Text>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Label>ID</Form.Label>
                                                    <InputGroup.Text>{user.userId}</InputGroup.Text>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Label>Access</Form.Label>
                                                    <InputGroup.Text>{user.accesslevelId}</InputGroup.Text>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Sähköposti</Form.Label>
                                                    <InputGroup.Text>{user.email}</InputGroup.Text>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Käyttäjä</Form.Label>
                                                    <InputGroup.Text>{user.username}</InputGroup.Text>
                                                </Form.Group>
                                            </Row>

                                            <br></br>
                                            <br></br>
                                            <Button variant="outline-danger" size="sm" onClick={() => deleteUser(user)}>Poista</Button>
                                        </form>
                                    </Col>
                                </Container>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button variant="outline-success" onClick={() => editUser(user)}>Muokkaa</Button> */}
                                <Button variant="outline-dark" onClick={() => setShow(false)}>Sulje</Button>

                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal>
                </div>
            </div>}

        </div>
    )
}

export default User