const fs = require('fs');
const RE_removeTrailingSpaces = /^[\s]*(.*?)[\s]*$/; // regex to remove trail spaces
const RE_pkg = /(?<=\[).*(?=\])/; // reges to get PKG
const RE_versionName = /versionName=.*/; // regex to get versionName

const removeTrailingSpaces = (data) => {
    // make it into array
    let newArr = data.split("\n");

    // this is where the new data gets to be saved
    let noTrails = [];

    // get rid of the trailing spaces
    for (i in newArr) {
        let removeTrails = newArr[i].replace(RE_removeTrailingSpaces, '$1');
        noTrails.push(removeTrails);
    }

    // return the new array leaving the last element out
    // because that is an empty element
    return noTrails.slice(0, -1);
}

const generateCleanReport = (cleanData) => {
    // Allocate array and object for the new report to store into
    let pkgArr = [];
    let verArr = [];
    let PKGandVER = {};

    // from the new array get the PKG and versionName from their on Array
    // last index of the file is a new line so we ignore that
    for (i in cleanData) {
        let getPKG;
        let getVER;

        if (i % 2 == 0) {
            getPKG = cleanData[i].match(RE_pkg)[0];
            pkgArr.push(getPKG);
        } else {
            getVER = cleanData[i].match(RE_versionName)[0];
            verArr.push(getVER);
        }
    }

    // combine both into a JSON
    for (i in pkgArr) {

        // convert it into an object
        PKGandVER[pkgArr[i]] = {
            "versionName": verArr[i],
            "updated": true
        };
    }

    PKGandVER['packageList'] = pkgArr;

    return PKGandVER
};

module.exports = {
    cleanThenReadRawReport: (rawReport, cb) => {
        // first open the rawReport.txt
        fs.readFile(rawReport, 'utf8', (err, data) => {
            // check for error
            if (err) {
                return console.log(err);
            }

            // remove the trailing spaces from the rawReport
            let cleanData = removeTrailingSpaces(data);

            // generate clean reports from the cleanData
            let cleanReport = generateCleanReport(cleanData);

            // do something with file
            cb(cleanReport);
        });
    },
    saveReportToJSON: (cleanReport, serialNumber) => {
        // write that new report into a json file
        fs.writeFile(`Reports/${serialNumber}.json`, JSON.stringify(cleanReport), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("comeplete");
            }
        });
    },
    readJSONDataBase: (serialNumber, cb) => {
        // read database
        fs.readFile(`Reports/${serialNumber}.json`, 'utf8', (err, data) => {
            // check if error --
            if (err) {
                // this means file does not exist so generate new one
                // send false so we can assert it later
                cb(false);
            } else {
                // send the data back
                cb(JSON.parse(data));
            }
        });
    }
}
