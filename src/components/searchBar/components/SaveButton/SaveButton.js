import React from 'react';

const SaveButton = ({handleClick,active}) => {
    if (active) {
        return <button onClick={handleClick} className="btn btn-main">Сохранить</button>
    } else {
        return <button className="btn btn-main btn-not-allowed">Сохранить</button>
    }
};

export default SaveButton;