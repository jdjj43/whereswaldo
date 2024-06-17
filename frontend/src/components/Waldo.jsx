import React, { useState } from 'react';
import './WaldoGame.css';

const WaldoGame = ({ src, waldoPosition, waldoSize }) => {
    const [message, setMessage] = useState('');

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        if (
            x >= waldoPosition.x &&
            x <= waldoPosition.x + waldoSize.width &&
            y >= waldoPosition.y &&
            y <= waldoPosition.y + waldoSize.height
        ) {
            setMessage('¡Encontraste a Waldo!');
        } else {
            setMessage('Sigue buscando...');
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
                src={src}
                alt="Where's Waldo"
                onClick={handleClick}
                style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: `${waldoPosition.x}%`,
                    top: `${waldoPosition.y}%`,
                    width: `${waldoSize.width}%`,
                    height: `${waldoSize.height}%`,
                    border: '2px solid red',
                    pointerEvents: 'none'
                }}
            />
            <div className="message">{message}</div>
        </div>
    );
};

export default WaldoGame;
