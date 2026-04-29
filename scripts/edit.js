addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#updateBtn").addEventListener('click', updateSong)
    const urlparam = new URLSearchParams(this.window.location.search)
    const songID = urlparam.get('id')

    const response = await fetch("https://mongo-backend-2pz3.onrender.com/api/songs/" + songID)
    if (response.ok) {
        let song = await response.json();
  
        document.querySelector('#songId').value = song._id;
        document.querySelector('#title').value = song.title;
        document.querySelector('#artist').value = song.artist;
        document.querySelector('#releaseDate').value = song.releaseDate.substring(0, 10);
        document.querySelector('#popularity').value = song.popularity;
        document.querySelector('#genre').value = song.genre;
    }
});

async function updateSong(){
  const songID = document.querySelector('#songId').value
    const song = {
        _id: document.querySelector('#songId').value,
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#releaseDate").value,
        popularity: document.querySelector("#popularity").value,
        // Split and trim whitespace from each genre
        genre: document.querySelector("#genre").value 
               ? document.querySelector("#genre").value.split(",").map(g => g.trim()) 
               : []
    };

    const response = await fetch("http://localhost:3000/api/songs/" + songID,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(song)

}) 
    if(response.ok){
        alert("Updated Song")
    }
    else{
        document.querySelector("#error").innerHTML = "Cannot update song"
    }


}
