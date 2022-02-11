const express = require("express")
const cors = require("cors")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server,{cors : {origin : "*"}})
const mongoose = require("mongoose")
const socketCookieParser = require('socket.io-cookie-parser')
const LiveTracking = require("./app.socket")

io.use(socketCookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

// -----------------------------------------------
// MongoDB Connection
// -----------------------------------------------

mongoose.connect("mongodb+srv://testdb:bueno123@cluster0.ypfes.mongodb.net/Live-tracking?retryWrites=true&w=majority",{ 
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const con = mongoose.connection

// -----------------------------------------------
// Live tracking
// -----------------------------------------------

new LiveTracking(io)._init()

// -----------------------------------------------
// API
// -----------------------------------------------

app.use('/user', require("./routes/user.routes.js"))

app.use('/', require("./routes/root.routes.js"))

server.listen(3001, () => console.log(`server runs at 3001`))
