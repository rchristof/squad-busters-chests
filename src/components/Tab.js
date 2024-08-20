import React, { useState, useEffect } from 'react';
import common from '../images/Common_Chest.webp';
import rare from '../images/Rare_Chest.webp';
import epic from '../images/Epic_Chest.webp';

const chestImages = [common, rare, epic];

const sequence = [
    0, 1, 0, 2, 0, 0, 1, 0, 1, 1,
    0, 0, 1, 0, 0, 2, 0, 1, 0, 1,
    0, 0, 0, 1, 0, 1, 0, 0, 1, 1,
    0, 0, 0, 2, 0, 2, 1, 0, 0, 1,
    0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    0, 2, 0, 0, 0, 0, 1, 0, 2, 1
];

function Tab({ tabId, clicked, updateClickedItems, onItemClick }) {
    const handleClick = (index) => {
        let updatedClicked;
        if (clicked.includes(index)) {
            updatedClicked = clicked.filter(i => i !== index);
        } else {
            updatedClicked = [...clicked, index];
        }
        updateClickedItems(tabId, updatedClicked);
        onItemClick(index); // Passa o índice do item clicado para a grid menor
    };

    return (
        <div className="grid">
            {sequence.map((imgIndex, index) => (
                <div className="grid-item" key={index} onClick={() => handleClick(index)}>
                    <img
                        src={chestImages[imgIndex]}
                        alt={`Baú ${imgIndex + 1}`}
                        className={clicked.includes(index) ? 'clicked' : ''}
                    />
                </div>
            ))}
        </div>
    );
}

export default Tab;
