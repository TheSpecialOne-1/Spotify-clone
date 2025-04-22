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
  },
  {
    title: "Pyramids",
    artist: "Frank Ocean",
    src: "assets/pyramids.mp3",
    cover: "assets/frank1.jpg"
  },
  {
    title: "Nights",
    artist: "Frank Ocean",
    src: "assets/nights.mp3",
    cover: "assets/frank2.jpg"
  },
  {
    title: "Novacane",
    artist: "Frank Ocean",
    src: "assets/novacane.mp3",
    cover: "assets/frank3.jpg"
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
  loadSong(filteredSongs[currentSong]);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + filteredSongs.length) % filteredSongs.length;
  loadSong(filteredSongs[currentSong]);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

audio.addEventListener("ended", nextSong);

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
      currentSong = filteredSongs.indexOf(song);
      loadSong(song);
      audio.play();
      playPauseBtn.textContent = "⏸️";
    });
    songList.appendChild(item);
  });
}

function renderArtistButtons() {
  artistFilters.innerHTML = "";
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

artistSearch.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  filteredSongs = songs.filter(song =>
    song.artist.toLowerCase().includes(value)
  );
  renderSongs(filteredSongs);
});

// Initial load
renderArtistButtons();
renderSongs(filteredSongs);
