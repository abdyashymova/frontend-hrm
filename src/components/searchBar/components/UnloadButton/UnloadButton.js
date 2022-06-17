import React from 'react';

const UnloadButton = ({handleClick,active}) => {
    if (active) {
        return <button className="btn btn-secondary" onClick={handleClick}>Выгрузить в excel</button>
    } else {
        return <button className="btn btn-secondary btn-not-allowed">Выгрузить в excel</button>
    }
};

export default UnloadButton;