import React, { useState, createContext } from 'react';

export const AdbContext = createContext();

export const AdbProvider = (props) => {
    // appInfoData.SN
    // appInfoData.currentData[pkg]
    // appInfoData.currentData.packageList; // array
    const [appInfoData, setAppInfoData] = useState({
        "SN": "null",
        "currentData": {
            "packageList": []
        }
    });
    const [shellStream, setShellStream] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AdbContext.Provider value={{
            "app_info": [appInfoData, setAppInfoData],
            "shell_stream": [shellStream, setShellStream],
            "is_loading": [isLoading, setIsLoading]
        }}>
            {props.children}
        </AdbContext.Provider >
    );
}