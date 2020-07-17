const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const AppsInfoSchema = new Schema({
    package: {
        type: String,
        required: true
    },
    version_name: {
        type: String,
        required: true
    },
    updated: {
        type: Boolean,
        required: true
    }
});

let AppsInfo = mongoose.model("AppsInfo", AppsInfoSchema);
module.exports = AppsInfo;