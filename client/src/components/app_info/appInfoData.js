import React, { useState, useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import { Row, Col } from 'reactstrap';
import './appInfoData.css';

const AppInfoData = (props) => {
    const { app_info } = useContext(AdbContext);
    const [appInfoData] = app_info;

    // appInfoData.SN
    // appInfoData.currentData[pkg]
    // appInfoData.currentData.packageList; // array

    const oddBGPicker = (val) => {
        // odd color picker
        if (val % 2 == 0) {
            return "";
        } else {
            return "oddBGColor";
        }
    }

    const updateClass = (isUpdated) => {
        if (isUpdated) {
            return "text-danger font-weight-bold";
        }
    }

    return (
        <div className="pb-5">
            {appInfoData.currentData.packageList.map((pkg, i) => (
                <Row>
                    <Col className="text-right p-0">
                        {/* Package Name */}
                        <p className={"mb-0 " + (oddBGPicker(i)) + " " + (updateClass(appInfoData.currentData[pkg].updated))}>
                            <span className={"mr-2 "}>
                                {pkg}
                            </span>
                        </p>
                    </Col>

                    <Col className="text-left p-0">
                        {/* Version Name */}
                        <p className={"mb-0 " + (oddBGPicker(i)) + " " + (updateClass(appInfoData.currentData[pkg].updated))}>
                            <span className="ml-2">
                                {appInfoData.currentData[pkg].versionName}
                            </span>
                        </p>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default AppInfoData;