
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const TVInfoSchema = new Schema({
    serial_number: {
        type: String,
        required: true
    },
    apps_info: [{
        type: Schema.Types.ObjectId,
        ref: 'AppsInfo'
    }]
});

let TVInfo = mongoose.model('TVInfo', TVInfoSchema);
module.exports = TVInfo;