const shell = require('shelljs');

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

const x = async () => {
    asd = await adbDevices();
    console.log("asd");
}

x();