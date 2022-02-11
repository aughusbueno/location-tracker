const socket = io()

const disconnectBtn = document.querySelector('#disconnect')

disconnectBtn.addEventListener('click', () => location.reload())

document.querySelector('#start').addEventListener('click', evt => {
    // socket.on()
    socket.emit("join:shed", {
        room : document.querySelector("#room").value
    })

    document.querySelector("#room").disabled = true
    disconnectBtn.classList.remove('d-none')
    document.querySelector('#start').classList.add('d-none')
})

socket.on("message", (data) => {
    console.log(data)
    let temp = ""

    for(const i in data){
        temp += `
        <div class="border p-3 rounded mb-3">
            <p class="text-primary">Plate # ${data[i].plate} - ${data[i].vehicle}</p>
            <small class="d-block">Latitude : ${data[i].latitude}</small>
            <small class="d-block">Longitude : ${data[i].longitude}</small>
        </div>`
    }
    
    document.querySelector('.list-of-driver').innerHTML = temp
})

socket.on('channel:locations', data => {
    const container = document.querySelector('tbody')

    let temp = ""

    for(const i in data){
        temp += `
        <tr>
            <td>${data[i].location}</td>
            <td>${data[i].count}</td>
        </tr>
        `
    }

    container.innerHTML = temp
})