const jwtdecode = require("./utils/jwt.parse")
const vehicleTracker = require("./models/vehicle-tracker")

class LiveTracking {
    constructor(io)
    {
        this.io = io
        this.RoomLocation = {}
        this.RoomShed = {}
        this.JoinedRooms = {
            shed : [],
            location : []
        }
    }
    // Join shed
    joinShed (socket, data)
    {
        // Client and Driver join shed
        socket.join(data.room)

        // Push to the list of rooms you joined
        this.JoinedRooms.shed.push(data.room)
    }
    // Join location
    joinLocation (socket, data) 
    {
        // JOIN DRIVER IN LOCATION ROOM
        socket.join(data.location)

        if(!this.RoomLocation[data.location])
        {
            this.RoomLocation[data.location] = {
                count : 1,
                location : data.location
            }
        }
        else{
            this.RoomLocation[data.location].count++
        }

        // Push to the list of rooms you joined
        this.JoinedRooms.location.push(data.location)
        console.log(this.RoomLocation)
        // broadcast to channel
        const res = this.RoomLocation
        socket.broadcast.emit("channel:locations",res)
    }

    // For Drivers
    async driverSendLocation (socket, data)
    {
        const cookieToken = socket.request.cookies['token']
        
        const user = jwtdecode(cookieToken.split('.')[1])
        // return console.log(typeof user)

        if(!this.RoomShed[user.plate])
        {
            this.RoomShed[user.plate] = {
                latitude : data.latitude,
                longitude : data.longitude,
                plate : user.plate,
                vehicle : user.vehicle,
                date : new Date()
            }
        }
        else{
            this.RoomShed[user.plate].latitude = data.latitude
            this.RoomShed[user.plate].longitude = data.longitude
            this.RoomShed[user.plate].date = new Date()
        }

        // Push to the list of rooms you joined
        this.JoinedRooms.shed.push(data.room)

        // Broadcast data of driver in the room
        const res = this.RoomShed
        socket.broadcast.to(data.room).emit("message", res)

        // Save data to MongoDB
        try{
            const coordinates = new vehicleTracker({
                plate : user.plate,
                vehicle : user.vehicle,
                latitude : data.latitude,
                longitude : data.longitude
            })

            const save = await coordinates.save()
            console.log(save)
        }
        catch(err){
            console.log(err)
        }
    }

    leave (socket,data)
    {
        // this.JoinedRooms.location.forEach(each => {
        //     this.RoomLocation[each].count--
        // })
        
        // // Rebroadcast to channel
        // const res = this.RoomLocation
        // console.log(res)
        // socket.broadcast.emit("channel:locations",res)
    }

    _init ()
    {
        this.io.on('connection', (socket) => {
            console.log(`New user : ${socket.id}`)

            const res = this.RoomLocation
            socket.broadcast.emit("channel:locations",res)

            // LOCATION JOIN
            socket.on("join:location", (data) => this.joinLocation(socket,data))

            // SHED JOIN
            socket.on("join:shed", (data) => this.joinShed(socket,data))

            // FOR DRIVERS
            socket.on("drivers", (data) => this.driverSendLocation(socket,data))

            // DISCONNECT
            socket.on('disconnect', (data) => this.leave(socket,data))
        })
    }
}

module.exports = LiveTracking