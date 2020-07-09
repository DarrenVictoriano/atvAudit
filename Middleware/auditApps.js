const shell = require('shelljs');

function sendCommand(cmd, cb) {
    let child = shell.exec(cmd, { async: true });

    child.stdout.on('data', function (data) {
        cb(data);
    });
}

function adbDevices(cb) {
    let child = shell.exec("adb devices", { async: true });

    child.stdout.on('data', function (data) {
        cb(data);
    });
}

sendCommand("adb devices", (data) => {
    console.log("asd" + data);
});