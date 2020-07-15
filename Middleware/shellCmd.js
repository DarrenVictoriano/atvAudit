const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { raw } = require('express');
const { stringify } = require('querystring');
const RE_removeTrailingSpaces = /^[\s]*(.*?)[\s]*$/; // regex to remove trail spaces


// Execute a shell command returns STDOUT as promise
const exec = (cmd, cb) => {
    let child = shell.exec(cmd, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

// Execute an adb shell command for all device connected
const adbShell = (cmd, cb) => {

    let child = shell.exec(`adb shell ${cmd}`, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

// Execute an adb shell command for a specific IP provided
const adbShellWithIP = (ip, cmd, cb) => {

    let child = shell.exec(`adb -s ${ip} shell ${cmd}`, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });

}

// Check all devices connected
const adbDevices = () => {

    let child = shell.exec("adb devices", { async: true });

    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

// Connect a device via IP
const adbConnect = (ip_address, cb) => {

    let child = shell.exec("adb connect " + ip_address, { async: true });

    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

// return the serial number of the TV as String
const getSerialNumber = (ip, cb) => {
    adbShellWithIP(ip, "getprop | grep -E 'ro.boot.serialno'", (data) => {
        let rawFileName = data.split(":")[1];
        let fileName = rawFileName.replace(RE_removeTrailingSpaces, '$1');
        // ppush the serial number into callback
        cb(fileName.slice(1, -1));
    });
}

// returns all PKGs installed as an Array
const getPackageList = (ip, cb) => {
    // this adb command will only return the PKGs and not the apk location
    adbShellWithIP(ip, "'pm list packages -f' | sed -e 's/.*=//' | sort", (data) => {
        let pkgList = data.split("\n");
        // push the array into a callback
        cb(pkgList);
    });
}

// returns the version number of the specified PKG
const getVerionNameFromPKG = (ip, pkg, cb) => {
    adbShellWithIP(ip, `dumpsys package ${pkg} | grep versionName`, (data) => {
        let rawVersionName = data.split("\n")[0];
        let versionName = rawVersionName.replace(RE_removeTrailingSpaces, '$1');
        cb(versionName);
    });
}
