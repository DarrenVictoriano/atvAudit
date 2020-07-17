const shell = require('shelljs');
const RE_removeTrailingSpaces = /^[\s]*(.*?)[\s]*$/; // regex to remove trail spaces
const RE_pkg = /(?<=\[).* (?=\])/; // reges to get PKG
const RE_versionName = /versionName=.*/; // regex to get versionName
const rawReportPath = 'Reports/rawReport.txt';

const exec = (cmd, cb) => {
    // Execute a shell command
    // Returns STDOUT as callback
    let child = shell.exec(cmd, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

const adbShell = (cmd, cb) => {
    // Execute an adb shell command for all device connected
    // Returns STDOUT as callback

    let child = shell.exec(`adb shell ${cmd}`, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

const adbShellWithIP = (ip, cmd, cb) => {
    // Execute an adb shell command for a specific IP provided
    // Returns STDOUT as callback

    let child = shell.exec(`adb -s ${ip} shell ${cmd}`, { async: true });
    child.stdout.on('data', function (data) {
        /* ... do something with data on callback ... */
        cb(data);
    });
}

module.exports = {
    adbDevices: (cb) => {
        // Check all devices connected
        // Returns STDOUT as callback

        let child = shell.exec("adb devices", { async: true });

        child.stdout.on('data', function (data) {
            /* ... do something with data on callback ... */
            cb(data);
        });
    },
    adbConnect: (ip_address, cb) => {
        // Connect a device via IP
        // Returns STDOUT as callback

        let child = shell.exec("adb connect " + ip_address, { async: true });

        child.stdout.on('data', function (data) {
            /* ... do something with data on callback ... */
            cb(data);
        });
    },
    getSerialNumber: (ip, cb) => {
        // Get serial number of the specified IP
        // return the serial number as String via callback

        adbShellWithIP(ip, "getprop | grep -E 'ro.boot.serialno'", (data) => {
            let rawFileName = data.split(":")[1];
            let fileName = rawFileName.replace(RE_removeTrailingSpaces, '$1');
            // ppush the serial number into callback
            cb(fileName.slice(1, -1));
        });
    },
    getPackageList: (ip, cb) => {
        // Get all PKGs of the specified IP
        // returns PKGs as an Array via callback

        // this adb command will only return the PKGs and not the apk location
        adbShellWithIP(ip, "'pm list packages -f' | sed -e 's/.*=//' | sort > Reports/pkg.txt", (data) => {
            let pkgList = data.split("\n");
            // push the array into a callback
            cb(pkgList);
        });
    },
    getVerionNameFromPKG: (ip, pkg, cb) => {
        // Get the versionName of the specified PKG
        // returns the version number as string via callback

        adbShellWithIP(ip, `dumpsys package ${pkg} | grep versionName`, (data) => {
            let rawVersionName = data.split("\n")[0];
            let versionName = rawVersionName.replace(RE_removeTrailingSpaces, '$1');
            cb(versionName);
        });
    },
    generateRawReport: (ip, cb) => {
        // Get the PKG and Version Name
        // returns the version number as string via callback

        adbShellWithIP(ip, `dumpsys package packages | grep -E 'Package \\[|versionName' > ${rawReportPath}`, (data) => {
            cb(rawReportPath);
        });
    }
}

// TODO: for PKG list and VersionName
// I may need to save the STDOUT into a file and then create an array from there
// Should probably handle it with a timeout

// (?<pkg><=\[).*(?=\])