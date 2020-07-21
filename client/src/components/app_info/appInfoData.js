import React, { useState, useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';
import './appInfoData.css';

const AppInfoData = (props) => {
    const { app_info, media_query } = useContext(AdbContext);
    const [appInfoData] = app_info;

    // media
    const isMobile = media_query;


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
        <div className="pb-5 px-0 container-fluid">
            {appInfoData.SN == "null"
                ? <div></div>
                : <div className="row title-row font-weight-bold">
                    <div className={"col " + (isMobile ? "text-left" : "text-right")}>Package</div>
                    <div className={"col " + (isMobile ? "text-right" : "text-left")}>Version</div>
                </div>}
            {appInfoData.currentData.packageList.map((pkg, i) => (
                <div className="row">
                    <div className={"col-sm p-0 " + (isMobile ? "text-left" : "text-right")}>
                        {/* Package Name */}
                        <p className={"mb-0 "
                            + (oddBGPicker(i))
                            + " "
                            + (updateClass(appInfoData.currentData[pkg].updated))
                            + " "
                            + (isMobile ? "text-mobile" : "")}>
                            <span className={(isMobile ? "ml-2" : "mr-2")}>
                                {pkg}
                            </span>
                        </p>
                    </div>

                    <div className={"col-sm p-0 " + (isMobile ? "text-right" : "text-left")}>
                        {/* Version Name */}
                        <p className={"mb-0 "
                            + (oddBGPicker(i))
                            + " "
                            + (updateClass(appInfoData.currentData[pkg].updated))
                            + " "
                            + (isMobile ? "text-mobile" : "")}>
                            <span className={(isMobile ? "mr-2" : "ml-2")}>
                                {appInfoData.currentData[pkg].versionName}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppInfoData;