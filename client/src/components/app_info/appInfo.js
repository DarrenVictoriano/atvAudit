import React, { useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import AppInfoData from './appInfoData';
import LoadingSpinner from '../spinner/spinner';

const AppInfo = (props) => {
    const { is_loading } = useContext(AdbContext);
    const [isLoading] = is_loading;

    return (
        <div className="app-info container-fluid">
            {isLoading ? <LoadingSpinner /> : <AppInfoData />}
        </div>

    );
}

export default AppInfo;