import React, { useState, useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import AppInfoData from './appInfoData';
import LoadingSpinner from '../spinner/spinner';

const AppInfo = (props) => {
    const { is_loading } = useContext(AdbContext);
    const [isLoading] = is_loading;
    const loading = true;
    return (
        <div className="app-info container-fluid">
            {isLoading ? <LoadingSpinner /> : <AppInfoData />}
        </div>

    );
}

export default AppInfo;