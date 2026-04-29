addEventListener("DOMContentLoaded", async function(){
    const urlparam = new URLSearchParams(this.window.location.search)
    const songID = urlparam.get('id')

    const response = await fetch("http://localhost:3000/api/songs/" + songID)
    const song = await response.json()

    let heading = ""
    heading += ` ${song.title}`
    this.document.querySelector("h1").innerHTML = heading

    let html = ""
    html+= `
            <h3>Artist = ${song.artist} </h3>
            <p>Popularity  = ${song.popularity} </p>
            <p>Release Date = ${song.releaseDate} </p>
    `
    document.querySelector("div").innerHTML = html
})