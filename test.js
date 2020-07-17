const fs = require('fs');
const RE_removeTrailingSpaces = /^[\s]*(.*?)[\s]*$/; // regex to remove trail spaces
const RE_pkg = /(?<=\[).*(?=\])/; // reges to get PKG
const RE_versionName = /versionName=.*/; // regex to get versionName
const genReport = require('./Middleware/reportAssembler');
const rawReport = 'Reports/rawReport.txt'
const cmd = require('./Middleware/shellCmd');
const { readJSONDataBase, cleanThenReadRawReport, saveReportToJSON } = require('./Middleware/reportAssembler');
const { getSerialNumber } = require('./Middleware/shellCmd');
const IP = '192.168.0.17';

// cmd.generateRawReport(IP, (dataPath) => {
//     console.log(dataPath);
// });

setTimeout(function () {
    getSerialNumber(IP, (serialNumber) => {
        cleanThenReadRawReport(rawReport, (currentData) => {
            let latestPackageList = currentData.packageList;

            // open the DB here then if DB exists compare and update
            readJSONDataBase(serialNumber, (dataFromDB) => {

                if (!dataFromDB) {
                    // save currentData as dataFromDB
                    saveReportToJSON(currentData, serialNumber);
                } else {
                    // let oldData = dataFromDB[latestPackageList[0]];
                    // let newData = currentData[latestPackageList[0]];
                    // console.log(oldData.versionName);
                    // console.log(newData.versionName);
                    // console.log(oldData.versionName === newData.versionName);
                    // if (oldData.versionName === newData.versionName) {
                    //     newData.updated = false;
                    // } else {
                    //     newData.updated = true
                    // }
                    // console.log(newData);
                    // comapre old vs new then save as new DB
                    for (i in latestPackageList) {
                        let oldData = dataFromDB[latestPackageList[i]];
                        let newData = currentData[latestPackageList[i]];

                        // check if this package exists in the old DB
                        if (!oldData) {
                            // if not mark as updated
                            // by default updated is true so we dont have to do anything
                        }

                        // if versionName is the same then there is no update
                        if (oldData.versionName === newData.versionName) {
                            newData.updated = false;

                        } else {
                            // set versionName is different then set updated to true
                            newData.updated = true
                        }
                    }

                    // then save the cuurent as the new DB
                    saveReportToJSON(currentData, serialNumber);
                }
            })
        });
    });
}, 1000)


// How to audit the devices:
// 1. upon button click, generate rawData using adb
// 2. very important, since generateClean report rely on rawReport I need to handle this delay
// 2. look for serialNumber.json
// 3. comapre the version from the json vs the generated report (currentData)