import React, { useState, createContext } from 'react';

export const AdbContext = createContext();

export const AdbProvider = (props) => {
    const [adbData, setAdbData] = useState({
        "data": false
    });

    return (
        <AdbContext.Provider value={[adbData, setAdbData]}>
            {props.children}
        </AdbContext.Provider >
    );
}