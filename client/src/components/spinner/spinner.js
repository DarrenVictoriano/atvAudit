import React, { useContext } from 'react';
import { Spinner } from 'reactstrap';
import { AdbContext } from '../../providers/adbContext';

const LoadingSpinner = (props) => {

    const { media_query } = useContext(AdbContext);
    const isMobile = media_query;

    return (

        <div className="mx-auto p-1 text-center" style={{ height: "100%", marginTop: (isMobile ? "150px" : "300px") }}>
            <Spinner color="primary" style={{ width: '10rem', height: '10rem' }} />{' '}
        </div>

    );
}

export default LoadingSpinner;