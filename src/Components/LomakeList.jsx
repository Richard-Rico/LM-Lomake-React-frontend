/* eslint-disable array-callback-return */
import '../App.css'
import React, { useState, useEffect } from 'react'
import LomakeAdd from '../Components/CustomerAdd'
import Button from 'react-bootstrap/Button'


import { useRef } from 'react'


const LomakeList = ({ setMessage, setIsPositive, setShowMessage }) => {

    // Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.

    const scollToCustomers = useRef();


    const [lisäystila, setLisäystila] = useState(false)

    useEffect(() => { }, [lisäystila,])


    return (
        <>  <br></br>

            {!lisäystila && <Button size="lg" variant="outline-dark" onClick={() => setLisäystila(true)}>Täytä esitietolomake</Button>}

            {lisäystila && <LomakeAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            />}

            <div ref={scollToCustomers}></div>

            {!lisäystila}

        </>
    )
}

export default LomakeList