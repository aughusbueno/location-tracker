const mongoose = require("mongoose")

const vehicleTracker = new mongoose.Schema({
    plate: {
        type : String,
        required : true
    },
    vehicle: {
        type : String,
        required : true
    },
    latitude: {
        type : String,
        required : true
    },
    longitude: {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("vehicleTracker",vehicleTracker)