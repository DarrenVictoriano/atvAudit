import React, { useState, useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import { Row, Col } from 'reactstrap';

const AppInfoData = (props) => {
    const [appInfo, setAppInfo] = useContext(AdbContext);
    const pBG = "#ebf2ff"; // odd color picker

    return (
        <Row className="pb-5">
            <Col className="text-right p-0">
                {/* Package Name */}
                <p className="mb-0">
                    <span className="mr-2" style={{ backgroundColor: "white" }}>com.android</span>
                </p>

                <p className="mb-0" style={{ backgroundColor: pBG }}>
                    <span className="mr-2">com.android</span>
                </p>
            </Col>
            <Col className="text-left p-0">
                {/* Version Name */}
                <p className="mb-0">
                    <span className="ml-2" style={{ backgroundColor: "white" }}>9</span>
                </p>

                <p className="mb-0" style={{ backgroundColor: pBG }}>
                    <span className="ml-2">9</span>
                </p>
            </Col>
        </Row >
    );
}

export default AppInfoData;