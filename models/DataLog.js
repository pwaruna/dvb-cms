const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment-timezone');
const dateNowSL = moment.tz(Date.now(), "Asia/Colombo");

const LogSchema = mongoose.Schema({

    value:  {
        type:String,
        required:true
    },
    created_date:  {
        type:Date,
        required: true,
        default: dateNowSL
    }
    
})

LogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("DataLog",LogSchema);