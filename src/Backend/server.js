const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const userRoutes = require('./Routes/userRouter')

const port = 4000

app.use(express.json());

mongoose.connect("mongodb+srv://mohsin:mohsinali@cluster0.ixvqejl.mongodb.net/AttendanceApplication?retryWrites=true&w=majority").then(() => {
    console.log('Database Connected')
}).catch((err) => {
    console.log('Err===>', err)
})
app.use(cors());
app.use("/api", userRoutes)
app.listen(port, () => {
    console.log(`App is running ${port}`)
})