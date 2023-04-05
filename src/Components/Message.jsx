import '../App.css'
import React from 'react'

const Message = ({isPositive, message}) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message