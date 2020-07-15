const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const AppsInfoSchema = new Schema({
    package: {
        type: String,
        required: true
    },
    pkg_info: [{
        type: Schema.Types.ObjectId,
        ref: 'PackageInfo'
    }]
});

let AppsInfo = mongoose.model("AppsInfo", AppsInfoSchema);
module.exports = AppsInfo;