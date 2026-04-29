document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", addSong);
});

async function addSong(event) {
    // Prevent form from refreshing the page if #addBtn is a submit type
    event.preventDefault();

    const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#releaseDate").value,
        popularity: document.querySelector("#popularity").value,
        // Split and trim whitespace from each genre
        genre: document.querySelector("#genre").value 
               ? document.querySelector("#genre").value.split(",").map(g => g.trim()) 
               : []
    };

    try {
        const response = await fetch("https://mongo-backend-2pz3.onrender.com/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });

        if (response.ok) {
            const results = await response.json();
            alert("Added song with ID " + results._id);
            document.querySelector("form").reset();
            document.querySelector("#error").innerHTML = ""; // Clear previous errors
        } else {
            const errorData = await response.json();
            document.querySelector("#error").innerHTML = "Error: " + (errorData.message || "Cannot add song.");
        }
    } catch (err) {
        document.querySelector("#error").innerHTML = "Server connection failed.";
    }
}
