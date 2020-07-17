const fs = require('fs');
const cmd = require('./Middleware/shellCmd');
const { get } = require('http');
const IP = "192.168.0.17";
const RE_removeTrailingSpaces = /^[\s]*(.*?)[\s]*$/; // regex to remove trail spaces
const RE_pkg = /(?<=\[).*(?=\])/; // reges to get PKG
const RE_versionName = /versionName=.*/; // regex to get versionName


// First run getPKGandVersion so that it creates the PKGandVer.txt file
// Probably use a timeout for the delay

fs.readFile('Reports/PKGandVER.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    // make it into array
    let newArr = data.split("\n");

    // make new array to store no trails
    let noTrails = [];
    let pkgArr = [];
    let verArr = [];
    let PKGandVER = [];

    // get rid of the trailing spaces
    for (i in newArr) {
        let removeTrails = newArr[i].replace(RE_removeTrailingSpaces, '$1');
        noTrails.push(removeTrails);
    }

    // from the new array get the PKG and versionName from their on Array
    // last index of the file is a new line so we ignore that
    for (i in noTrails.slice(0, -1)) {
        let getPKG;
        let getVER;

        if (i % 2 == 0) {
            getPKG = noTrails[i].match(RE_pkg)[0];
            pkgArr.push(getPKG);
        } else {
            getVER = noTrails[i].match(RE_versionName)[0];
            verArr.push(getVER);
        }
    }


    // combine both into an array of JSON
    for (i in pkgArr) {
        let newJSON = {
            'package': pkgArr[i],
            'versionName': verArr[i]
        }

        PKGandVER.push(newJSON);
    }

    console.log(PKGandVER);
});