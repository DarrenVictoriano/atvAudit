const cmd = require('../Middleware/shellCmd');
const tvInfoModel = require('../Models/TVInfo');
const pkgInfoModel = require('../Models/PackageInfo');
const appsInfoModel = require('../Models/AppsInfo');

module.exports = {
    showConnectedDevices: (req, res) => {
        cmd.adbDevices((STDOUT) => {
            res.status(400).json(STDOUT);
        });
    },
    connectAdbDevice: (req, res) => {
        cmd.adbConnect(req.body.ip, (STDOUT) => {
            res.status(400).json(STDOUT);
        });
    },
    startAudit: (req, res) => {
        let ip_address = req.body.ip;

        // first get TVs serial number
        cmd.getSerialNumber(ip_address, (serialNumber) => {

            // look up database with that serial
            tvInfoModel.findOne({ serialNumber })
                .populate("apps_info")
                .then(tvInfo => {
                    // if tvInfo already in the DB update records
                    if (tvInfo) {
                        // get all PKGs installed on the TV
                        cmd.getPackageList(ip_address, (pkgList) => {
                            // get current version
                            for (i = 0; i < pkgList.length; i++) {
                                cmd.getVerionNameFromPKG(ip_address, pkgList[i], (versionName) => {
                                    // compare if old version != current version
                                    if (tvInfo.apps_info.package == 1) {
                                        // dummy comparis
                                    }
                                });
                            }
                        });

                    } else {
                        // if tvInfo does not exists initialize a new records
                        this.initializeRecords(serialNumber, ip_address);
                    }

                });
        });





        // update version into current one
        // set updated = true
        // else initialize DB for that TV
    },
    initializeRecords: (serialNumber, ip_address) => {

        // create new TV records using the serial number
        let newTVrecords = new tvInfoModel({
            serial_number: serialNumber
        });

        newTVrecords.save()
            .then(tvInfo => {
                // after creating new TV info
                // start creating app info

                // first get all PKGs
                cmd.getPackageList(ip_address, (pkgList) => {
                    // create an array that will hold the AppsInfo objects
                    let newAppsArray = [];

                    // loop through all the apps and get the version
                    for (i = 0; pkgList.length; i++) {
                        // get version of each pkg
                        cmd.getVerionNameFromPKG(ip_address, pkgList[i], (versionName) => {

                            // create new entry for each one
                            let newEntry = {
                                package: pkgList[i],
                                version_name: versionName,
                                update: true
                            };

                            // push new app info into the app info array
                            newAppsArray.push(newEntry);
                        });
                    }

                    // save the array info DB




                });
            })


    }
}

