const socket = io()

class LiveLocationTracker {
    constructor()
    {
        // For testing
        this.driverSet = {
            a : {
                position : [
                    [14.374118597297565, 120.92870175191942],
                    [14.373878263269052, 120.92867694186211],
                    [14.373648853273556, 120.92867468640236],
                    [14.37337684008548, 120.92866909892874],
                    [14.37320781378693, 120.92865582267258],
                    [14.372956430488411, 120.92864448024245],
                    [14.372788032744513, 120.9286476699442],
                    [14.372517669120743, 120.92861736777681],
                    [14.372179327904043, 120.92856792739875],
                    [14.372038738478984, 120.92853603037778],
                    [14.371776098660662, 120.92848340029617],
                    [14.371606155082599, 120.9284323650652],
                    [14.371422306884162, 120.9283861143827],
                    [14.371172025900249, 120.92833986369986],
                    [14.370872306331789, 120.92822503443163],
                    [14.37068653411122, 120.92820095137293],
                    [14.370355914872752, 120.9280000001468],
                    [14.370116447363525, 120.92786443781033],
                    [14.369923328219588, 120.92776396220144],
                    [14.369734843772278, 120.92767943509486],
                    [14.369489195769564, 120.92754546760496],
                    [14.369263631957548, 120.92746413020177],
                    [14.369007168717957, 120.92734770607579],
                    [14.368763064879694, 120.92725042016583],
                    [14.368463342080235, 120.92714834970135],
                    [14.368115125669414, 120.92707051575906],
                    [14.36767327596381, 120.92701026138636],
                    [14.367337051901018, 120.92703491729257],
                    [14.367079830961918, 120.9270918155398],
                    [14.366716046564212, 120.9271638866538],
                    [14.366354098872359, 120.92724354419987],
                    [14.366117087127439, 120.92727578653626],
                    [14.365920495799669, 120.92731561530476],
                    [14.365455657658194, 120.92739716945503],
                    [14.364998167808725, 120.92747113716794],
                    [14.364638054645278, 120.92754131167742],
                    [14.36422833335821, 120.9276418319199],
                    [14.363893941444692, 120.92773476571301],
                    [14.363491568085777, 120.92779925039586],
                    [14.363004676979251, 120.92780304362935],
                    [14.362554531440468, 120.92776131825285],
                    [14.362368960964556, 120.92770442000896],
                    [14.362014355577678, 120.9275982099328],
                    [14.361402522172456, 120.92736492713459],
                    [14.361152643787928, 120.92729664924578],
                    [14.360895415739984, 120.92718664596649],
                    [14.360700657163376, 120.92711836807078],
                    [14.360338699743311, 120.92699508854464],
                    [14.360118217774367, 120.92690974117433],
                    [14.35983159090017, 120.92681680738117],
                    [14.359530264807622, 120.92669352784627],
                    [14.359247311890861, 120.9265911110028],
                    [14.358955171814454, 120.92649628058916],
                    [14.358643388801855, 120.92635950716567],
                    [14.358209451687353, 120.92609933289442],
                    [14.357897640071632, 120.92594644698057],
                    [14.357604017075394, 120.92581233654114],
                    [14.357219448312179, 120.92557898436296],
                    [14.356811492888353, 120.92536172543998],
                    [14.35633337858995, 120.9250988689787],
                    [14.355946209189518, 120.9248923388807],
                    [14.35564478825343, 120.92473408853931],
                    [14.355234978350243, 120.924496352791],
                    [14.354915367197956, 120.92425495400002]
                ]
            },

            b : {
                position : [
                    [14.365896640939326, 120.91817338796241],
                    [14.366161671361096, 120.91897268618146],
                    [14.366390324806002, 120.91956277211497],
                    [14.365797904035258, 120.92009384945513],
                    [14.365080760970603, 120.92071075769773],
                    [14.364581877505502, 120.9210809025106],
                    [14.363989451945798, 120.92160125101559],
                    [14.363194352003989, 120.92230398982453],
                    [14.362679874074942, 120.92274387206588],
                    [14.362045869343394, 120.92303891503263],
                    [14.361209188179904, 120.9234036955333],
                    [14.360528408044528, 120.92338223787206],
                    [14.360039908057914, 120.92339296670723],
                    [14.359104479562463, 120.92330177161156],
                    [14.358423693042441, 120.92319448326],
                    [14.357644163923135, 120.92314083907608],
                    [14.356942585418702, 120.92323203417489],
                    [14.35578367682073, 120.92330713604679],
                    [14.355102880174877, 120.92339296675785],
                    [14.354650746924719, 120.92348952627424],
                    [14.354184911448492, 120.9236580545691],
                    [14.354145580569968, 120.92370767469113],
                    [14.353789417341133, 120.92373925113645],
                    [14.353544691365483, 120.92380691492912],
                    [14.35315138118606, 120.92391743247445],
                    [14.35284984292572, 120.92397156350859],
                    [14.352810511806592, 120.92398960720547],
                    [14.352659742497657, 120.92400539542375]
                ]
            }
        }
    }

    isSupported ()
    {
        if("geolocation" in navigator) return true

        return false
    }

    GeolocationErrorHandlers (error)
    {
        const { code } = error

        switch ( code ){
            case GeolocationPositionError.TIMEOUT:
                console.warn("GEOLOCATION TIMEOUT")
            break;
            case GeolocationPositionError.PERMISSION_DENIED:
                console.warn("GEOLOCATION PERMISSION DENIED")
            break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
                console.warn("POSITION UNAVAILABLE")
            break;
        }
    }

    CurrentPosition (plate,vehicle,pos)
    {
        const room = document.querySelector('#room')

        // join room
        socket.emit('join:shed', {
            room : room.value
        })

        // add more object
        socket.emit('drivers', {
            room : room.value,
            latitude : pos.coords.latitude,
            longitude : pos.coords.longitude
        })

        document.querySelector('#room').disabled = true
        document.querySelector('#set').disabled = true
        document.querySelector('#start').classList.add('d-none')
        document.querySelector('#disconnect').classList.remove('d-none')
    }

    DisconnectShed(){
        document.querySelector('#disconnect').addEventListener('click', evt => {
            location.reload()
        })
    }

    JoinLocation ()
    {
        const arrayOfLocations = [
            "location1",
            "location2",
            "location3",
            "location4",
            "location5",
            "location6",
            "location7",
            "location8",
            "location9",
            "location10",
            "location11",
            "location12",
            "location13",
            "location14",
            "location15"
        ]

        document.querySelector('#join-location').addEventListener('click', event => {

            let randomIndex = Math.floor(Math.random() * (arrayOfLocations.length - 1))

            socket.emit("join:location",  {
                location : arrayOfLocations[randomIndex]
            })
        })
    }

    WatchPosition () 
    {
        if(!(this.isSupported())) return alert("Geolocation is not supported")
        let i = 0

        document.querySelector('#start').addEventListener('click', event => {
            // TEST
            const set = document.querySelector("#set")

            const selectedSet = this.driverSet[set.value]
            const position = selectedSet.position


            let ticks = setInterval( timer => {
                if(i === position.length - 1) return clearInterval(ticks)

                this.CurrentPosition(
                    selectedSet.plate,
                    selectedSet.vehicle,
                    {
                        coords : {
                            latitude : selectedSet.position[i][0],
                            longitude : selectedSet.position[i][1]
                        }
                    }
                )

                i++
            },3000)

            // const options = {
            //     enableHighAccuracy: true
            // }

            // navigator.geolocation.watchPosition((pos) => {
            //         this.CurrentPosition(plate.value,vehicle.value,pos)
            //     },
            //     this.GeolocationErrorHandlers,
            //     options
            // )
        })
    }

    _init()
    {
        this.WatchPosition()
        this.JoinLocation()
        this.DisconnectShed()
    }
}

(new LiveLocationTracker)._init()