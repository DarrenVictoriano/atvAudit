import React, { useState, useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import AppInfoData from './appInfoData';
import LoadingSpinner from '../spinner/spinner';

const AppInfo = (props) => {
    const [isLoading, setIsLoading] = useContext(AdbContext);

    return (
        <div className="app-info container-fluid">
            {/* <LoadingSpinner /> */}
            <AppInfoData />
        </div>

    );
}

export default AppInfo;