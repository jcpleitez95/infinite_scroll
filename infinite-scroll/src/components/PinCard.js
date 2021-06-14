import React from 'react'

export default function PinCard({url, description, pinner}) {
    
    return (
        <div className="pin-card">
            <h4 className="pinner">{pinner}</h4>
            <img className="kitten" src={url} alt="kitten" height="250" width="250"></img>
            <p className="description">{description}</p>
        </div>
    )
}
