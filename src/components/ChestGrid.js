import React from 'react';
import common from '../images/Common_Chest.webp';
import rare from '../images/Rare_Chest.webp';
import epic from '../images/Epic_Chest.webp';

const chestImages = [common, rare, epic];

function ChestGrid({ items = [] }) { // Garante que items seja um array
    return (
        <>
        <p>Next Chests:</p>
        <div className="single-row-grid">
            {items.map((imgIndex, index) => (
                <div className="grid-item" key={index}>
                    <img src={chestImages[imgIndex]} alt={`Baú ${imgIndex + 1}`} />
                    <span className="index-badge">{index + 1}</span>
                </div>
            ))}
        </div>
            </>
    );
}

export default ChestGrid;
