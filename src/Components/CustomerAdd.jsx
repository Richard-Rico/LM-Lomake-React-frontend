import '../App.css'
import React, { useState } from 'react'
import CustomerService from '../services/Customer'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useRef } from 'react'


const CustomerAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

    // Komponentin tilan määritys //
    const scollToLomake = useRef();

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newVauvaIka, setNewVauvaIka] = useState()

    const [newSynnytysViikko, setNewSynnytysViikko] = useState('')
    const [newSynnytysResume, setNewSynnytysResume] = useState('')
    const [newSynnytysHaaste, setNewSynnytysHaaste] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')


    // onSubmit tapahtumankäsittelijä funktio //
    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            VauvaIka: newVauvaIka,
            synnytysViikko: newSynnytysViikko,
            synnytysResume: newSynnytysResume,
            synnytysHaaste: newSynnytysHaaste,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        /*const token = localStorage.getItem('token')
            CustomerService.setToken(token)*/

        CustomerService.create(newCustomer)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Added new Customer: " + newCustomer.companyName)
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

        // ----- Esitietolomake ----- //
        <div id="addNew">
            <div ref={scollToLomake}></div>
            <p>Imetysohjaus</p>
            <h2>Esitietolomake</h2>
            <Container>
                <Col xs={15}>
                    <br></br>
                    <br></br>
                    <div className="ButtonR">
                        <Button onClick={() => setLisäystila(false)} variant="outline-danger">Sulje</Button>
                    </div>

                    <form onSubmit={handleSubmit} className="Formtext">

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Nimi</Form.Label>
                                <Form.Control value={newCompanyName} placeholder="Etunimi Sukunimi"
                                    onChange={({ target }) => setNewCompanyName(target.value)} required
                                    onClick={() => scollToLomake.current.scrollIntoView()} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>ID</Form.Label>
                                <Form.Control value={newCustomerId} placeholder="Käyttäjätunnus (Isoilla kirjaimilla)" maxLength="5" minLength="5"
                                    onChange={({ target }) => setNewCustomerId(target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Vauvan ikä</Form.Label>
                                <Form.Control value={newVauvaIka} placeholder="Päivää / Viikkoa"
                                    onChange={({ target }) => setNewVauvaIka(target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Synnytys raskausviikolla</Form.Label>
                                <Form.Control value={newSynnytysViikko} placeholder="esim. h40+3"
                                    onChange={({ target }) => setNewSynnytysViikko(target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Synnytyksen kulku</Form.Label>
                                <Form.Control value={newSynnytysResume} placeholder="Kertoisitko lyhyesti synnytyksestä?" as="textarea" rows={3}
                                    onChange={({ target }) => setNewSynnytysResume(target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Imetyshaasteet</Form.Label>
                                <Form.Control value={newSynnytysHaaste} placeholder="Kertoisitko, millaista tukea tarvitsette imetykseen?" as="textarea" rows={3}
                                    onChange={({ target }) => setNewSynnytysHaaste(target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Osoite</Form.Label>
                                <Form.Control value={newAddress} placeholder="Osoite"
                                    onChange={({ target }) => setNewAddress(target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Postinumero</Form.Label>
                                <Form.Control value={newPostalCode} placeholder="Postinumero"
                                    onChange={({ target }) => setNewPostalCode(target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Kaupunki</Form.Label>
                                <Form.Control value={newCity} placeholder="Kaupunki"
                                    onChange={({ target }) => setNewCity(target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Puhelinnumero</Form.Label>
                                <Form.Control value={newPhone} placeholder="Puhelin"
                                    onChange={({ target }) => setNewPhone(target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Ovikoodi / Summeri</Form.Label>
                                <Form.Control value={newFax} placeholder="Ovikoodi"
                                    onChange={({ target }) => setNewFax(target.value)} required />
                            </Form.Group>
                        </Row>

                        <br></br>
                        <div className='div'>
                            <Button type='submit' variant="outline-success">Lähettää</Button>
                        </div>

                        <br></br>
                        <br></br>

                        <p>* Tieto on luottamuksellista. Minulla on terveydenhuollon ammattihenkilönä vaitiolovelvollisuus.</p>

                        <br></br>

                    </form>
                </Col>
            </Container>

        </div>
    )
}

export default CustomerAdd
