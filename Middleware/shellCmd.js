const shell = require('shelljs');
const fs = require('fs');
const path = require('path');


// Execute a shell command returns STDOUT as promise
const sendCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        let child = shell.exec(cmd, { async: true });

        child.stdout.on('data', function (data) {
            // check if data does not contain data
            if (!data) reject(new Error("Data Undefined"));

            // resolve if it does
            resolve(data);
        })
    });
}

// Execute an adb shell command for all device connected
const adbShell = (cmd, cb) => {

    // return new Promise((resolve, reject) => {
    //     let child = shell.exec(`adb shell ${cmd}`, { async: true });

    //     child.stdout.on('data', function (data) {
    //         // check if data does not contain data
    //         if (!data) reject(new Error("Data Undefined"));

    //         // resolve if it does
    //         resolve(data);
    //     })
    // });

    let child = shell.exec(`adb shell ${cmd}`, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data ... */
        cb(data);
    });
}

// Execute an adb shell command for a specific IP provided
const adbShellWithIP = (ip, cmd) => {

    return new Promise((resolve, reject) => {
        let child = shell.exec(`adb shell -s ${ip} ${cmd}`, { async: true });

        child.stdout.on('data', function (data) {
            // check if data does not contain data
            if (!data) reject(new Error("Data Undefined"));

            // resolve if it does
            resolve(data);
        })
    });
}

// Check all devices connected
const adbDevices = () => {
    return new Promise((resolve, reject) => {
        let child = shell.exec("adb devices", { async: true });

        child.stdout.on('data', function (data) {
            // check if data does not contain data
            if (!data) reject(new Error("Data Undefined"));

            // resolve if it does
            resolve(data);
        });

    });
}

// Connect a device via IP
const adbConnect = (ip_address) => {
    return new Promise((resolve, reject) => {
        let child = shell.exec("adb connect " + ip_address, { async: true });

        child.stdout.on('data', function (data) {
            // check if data does not contain data
            if (!data) reject(new Error("Data Undefined"));

            // resolve if it does
            resolve(data);
        });

    });
}


// if Im doing this then there is no STD out so I can't do anything with the DATA
// works even without calling the callback
adbShell("getprop | grep -E 'ro.boot.serialno' > Reports/asd.txt");

// this will work
// adbShell("getprop | grep -E 'ro.boot.serialno'", (data) => {
//     console.log("asd" + data);
// });

// TODO: make all shell command callback again