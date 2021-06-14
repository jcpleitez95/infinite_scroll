import React from 'react';
import sprite from './sprites/sprite.png'

export default function Sprite() {
    return (
        <div className="sprite-container">
            <div className ="sprite" style={{
                backgroundImage: `url(${sprite})`,
            }}>  
            </div>
        </div>
    )
}
