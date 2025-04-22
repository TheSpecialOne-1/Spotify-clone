const songs = [
  {
    title: "Drugs You Should Try It",
    artist: "Travis Scott",
    src: "assets/drugs-you-should-try-it.mp3",
    cover: "assets/travis1.jpg"
  },
  {
    title: "Top Floor",
    artist: "Travis Scott",
    src: "assets/top-floor.mp3",
    cover: "assets/travis2.jpg"
  },
  {
    title: "Down In Atlanta",
    artist: "Travis Scott",
    src: "assets/down-in-atlanta.mp3",
    cover: "assets/travis3.jpg"
  },
  {
    title: "Highjack",
    artist: "A$AP Rocky",
    src: "assets/highjack.mp3",
    cover: "assets/rocky1.jpg"
  },
  {
    title: "ASAP Forever",
    artist: "A$AP Rocky",
    src: "assets/asap-forever.mp3",
    cover: "assets/rocky2.jpg"
  },
  {
    title: "Blowing Minds",
    artist: "A$AP Rocky",
    src: "assets/blowin-minds.mp3",
    cover: "assets/rocky3.jpg"
  }
];

let currentSong = 0;
let filteredSongs = [...songs];

const songList = document.getElementById("song-list");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playPauseBtn = document.getElementById("playPauseBtn");

const artistSearch = document.getElementById("artistSearch");
const artistFilters = document.getElementById("artistFilters");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}


function togglePlay() {
  if (audio.paused) {
    audio.play().catch(error => console.error("Playback failed:", error));
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % filteredSongs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + filteredSongs.length) % filteredSongs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

audio.addEventListener("ended", nextSong);

// Render song list
function renderSongs(songArray) {
  songList.innerHTML = "";
  songArray.forEach((song, index) => {
    const item = document.createElement("div");
    item.classList.add("song-item");
    item.innerHTML = `
      <img src="${song.cover}" alt="cover" />
      <div>
        <strong>${song.title}</strong><br />
        <small>${song.artist}</small>
      </div>
    `;
item.addEventListener("click", () => {
  currentSong = songs.indexOf(song); // use global index for next/prev to work
  loadSong(song);
  audio.play();
  playPauseBtn.textContent = "⏸️";
});

}

// Create artist buttons
function renderArtistButtons() {
  const uniqueArtists = [...new Set(songs.map(song => song.artist))];
  uniqueArtists.forEach(artist => {
    const btn = document.createElement("button");
    btn.classList.add("artist-btn");
    btn.textContent = artist;
    btn.addEventListener("click", () => {
      filteredSongs = songs.filter(song => song.artist === artist);
      renderSongs(filteredSongs);
    });
    artistFilters.appendChild(btn);
  });
}

// Search artist dynamically
artistSearch.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  filteredSongs = songs.filter(song =>
    song.artist.toLowerCase().includes(value)
  );
  renderSongs(filteredSongs);
});

// Initial render
filteredSongs = [...songs];
renderArtistButtons();
renderSongs(filteredSongs);
