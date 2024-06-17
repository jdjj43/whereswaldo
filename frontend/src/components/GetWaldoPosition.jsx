import React from 'react';

const GetWaldoPosition = ({ src }) => {
    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        console.log(`Clicked at position: X: ${x}, Y: ${y}`);
        alert(`Clicked at position: X: ${x}, Y: ${y}`);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
                src={src}
                alt="Get Waldo Position"
                onClick={handleClick}
                style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default GetWaldoPosition;
