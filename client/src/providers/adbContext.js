import React, { useState, createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

export const AdbContext = createContext();

export const AdbProvider = (props) => {
    // this states holds the data
    const [appInfoData, setAppInfoData] = useState({
        "SN": "null",
        "currentData": {
            "packageList": []
        }
    });
    const [shellStream, setShellStream] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // this state is just for css responsiveness
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

    return (
        <AdbContext.Provider value={{
            "app_info": [appInfoData, setAppInfoData],
            "shell_stream": [shellStream, setShellStream],
            "is_loading": [isLoading, setIsLoading],
            "media_query": isMobile
        }}>
            {props.children}
        </AdbContext.Provider >
    );
}