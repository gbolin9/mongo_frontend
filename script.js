addEventListener("DOMContentLoaded", async function(){
    const response = await fetch("https://mongo-backend-2pz3.onrender.com/api/songs")
    const songs = await response.json()

    let html = ""
    for (let song of songs){
        html += `<li>${song.title} - ${song.artist}</li>`
    }

    document.querySelector("#addedsong").innerHTML = html
})
