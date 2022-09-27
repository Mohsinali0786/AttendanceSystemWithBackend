const mongoose = require('mongoose')
const attendanceSchema = mongoose.Schema({
    currDate: String,
    currTime: String,
    currDay: String,
    status: String,
    email: String,
    companyName: String,
})

let Attendance = mongoose.model("Attendance", attendanceSchema)
module.exports = Attendance