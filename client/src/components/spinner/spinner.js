import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = (props) => {
    return (

        <div className="mx-auto p-1 text-center" style={{ height: "100%", marginTop: "30%" }}>
            <Spinner color="primary" style={{ width: '10rem', height: '10rem' }} />{' '}
        </div>

    );
}

export default LoadingSpinner;