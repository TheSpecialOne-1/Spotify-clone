// script.js

// ——— Data ———
const songs = [
  { title: "Drugs You Should Try It", artist: "Travis Scott", src: "assets/drugs-you-should-try-it.mp3", cover: "assets/travis1.jpg" },
  { title: "Top Floor",              artist: "Travis Scott", src: "assets/top-floor.mp3",                 cover: "assets/travis2.jpg" },
  { title: "Down In Atlanta",        artist: "Travis Scott", src: "assets/down-in-atlanta.mp3",         cover: "assets/travis3.jpg" },
  { title: "Highjack",               artist: "A$AP Rocky",   src: "assets/highjack.mp3",                cover: "assets/rocky1.jpg" },
  { title: "ASAP Forever",           artist: "A$AP Rocky",   src: "assets/asap-forever.mp3",            cover: "assets/rocky2.jpg" },
  { title: "Blowing Minds",          artist: "A$AP Rocky",   src: "assets/blowin-minds.mp3",            cover: "assets/rocky3.jpg" },
  { title: "Pyramids",               artist: "Frank Ocean",   src: "assets/pyramids.mp3",                cover: "assets/frank1.jpg" },
  { title: "Nights",                 artist: "Frank Ocean",   src: "assets/nights.mp3",                  cover: "assets/frank2.jpg" },
  { title: "Novacane",               artist: "Frank Ocean",   src: "assets/novacane.mp3",                cover: "assets/frank3.jpg" }
];

// ——— State ———
let currentSong        = 0;
let filteredSongs      = [...songs];
let playlists          = [];       // each { name: string, songs: [] }
let activePlaylist     = null;     // index of selected playlist
let currentPlaylistIdx = 0;        // position within active playlist

// ——— DOM References ———
const songList      = document.getElementById("song-list");
const audio         = document.getElementById("audio");
const titleEl       = document.getElementById("title");
const artistEl      = document.getElementById("artist");
const coverEl       = document.getElementById("cover");
const playPauseBtn  = document.getElementById("playPauseBtn");
const artistSearch  = document.getElementById("artistSearch");
const artistFilters = document.getElementById("artistFilters");
const playlistsDiv  = document.getElementById("playlists");
const playlistDiv   = document.getElementById("playlist");

// ——— Core Player Functions ———
function loadSong(song) {
  titleEl.textContent  = song.title;
  artistEl.textContent = song.artist;
  coverEl.src          = song.cover;
  audio.src            = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch(e => console.error("Playback error:", e));
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function nextSong() {
  if (activePlaylist !== null && playlists[activePlaylist].songs.length) {
    nextPlaylistSong();
  } else {
    currentSong = (currentSong + 1) % filteredSongs.length;
    loadSong(filteredSongs[currentSong]);
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
}

function prevSong() {
  if (activePlaylist !== null && playlists[activePlaylist].songs.length) {
    currentPlaylistIdx = (currentPlaylistIdx - 1 + playlists[activePlaylist].songs.length) % playlists[activePlaylist].songs.length;
    playFromPlaylist(currentPlaylistIdx);
  } else {
    currentSong = (currentSong - 1 + filteredSongs.length) % filteredSongs.length;
    loadSong(filteredSongs[currentSong]);
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
}

audio.addEventListener("ended", nextSong);

// ——— Render Song List & Filters ———
function renderSongs(list) {
  songList.innerHTML = "";
  list.forEach((song, idx) => {
    const item = document.createElement("div");
    item.className = "song-item";
    item.innerHTML = `
      <img src="${song.cover}" alt="" />
      <div>
        <strong>${song.title}</strong><br/>
        <small>${song.artist}</small>
      </div>
    `;
    item.onclick = () => {
      activePlaylist = null;
      currentSong = idx;
      loadSong(song);
      audio.play();
      playPauseBtn.textContent = "⏸️";
    };
    songList.appendChild(item);
  });
}

function renderArtistButtons() {
  artistFilters.innerHTML = "";
  [...new Set(songs.map(s => s.artist))].forEach(name => {
    const btn = document.createElement("button");
    btn.className = "artist-btn";
    btn.textContent = name;
    btn.onclick = () => {
      filteredSongs = songs.filter(s => s.artist === name);
      renderSongs(filteredSongs);
    };
    artistFilters.appendChild(btn);
  });
}

// ——— Search (by title OR artist) ———
artistSearch.addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  filteredSongs = q
    ? songs.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q)
      )
    : [...songs];
  renderSongs(filteredSongs);
});

// ——— Playlist Management ———
function createPlaylist() {
  const input = document.getElementById("newPlaylistName");
  const name = input.value.trim();
  if (!name) return alert("Playlist name cannot be empty.");
  playlists.push({ name, songs: [] });
  activePlaylist = playlists.length - 1;
  input.value = "";
  renderPlaylists();
  renderPlaylistSongs();
}

function renderPlaylists() {
  playlistsDiv.innerHTML = "";
  playlists.forEach((pl, idx) => {
    const div = document.createElement("div");
    div.className = "playlist-name-item";
    div.innerHTML = `
      <span ${idx === activePlaylist ? 'class="active"' : ""}>${pl.name}</span>
      <div>
        <button onclick="selectPlaylist(${idx})">Choose</button>
        <button onclick="removePlaylist(${idx})">❌</button>
      </div>
    `;
    playlistsDiv.appendChild(div);
  });
}

function selectPlaylist(idx) {
  activePlaylist = idx;
  currentPlaylistIdx = 0;
  renderPlaylists();
  renderPlaylistSongs();
}

function removePlaylist(idx) {
  playlists.splice(idx, 1);
  if (activePlaylist === idx) activePlaylist = null;
  else if (activePlaylist > idx) activePlaylist--;
  renderPlaylists();
  renderPlaylistSongs();
}

// ——— Active Playlist Songs ———
function addToPlaylist() {
  if (activePlaylist === null) {
    return alert("Please choose or create a playlist first.");
  }
  const song = filteredSongs[currentSong];
  const pl = playlists[activePlaylist];
  if (!pl.songs.includes(song)) {
    pl.songs.push(song);
    renderPlaylistSongs();
  }
}

function renderPlaylistSongs() {
  playlistDiv.innerHTML = "";
  if (activePlaylist === null) {
    playlistDiv.innerHTML = "<em>No playlist selected.</em>";
    return;
  }
  playlists[activePlaylist].songs.forEach((song, idx) => {
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.innerHTML = `
      <div><strong>${song.title}</strong> — <small>${song.artist}</small></div>
      <div>
        <button onclick="playFromPlaylist(${idx})">▶️</button>
        <button onclick="removeFromPlaylist(${idx})">❌</button>
      </div>
    `;
    playlistDiv.appendChild(item);
  });
}

function removeFromPlaylist(idx) {
  const pl = playlists[activePlaylist];
  pl.songs.splice(idx, 1);
  if (currentPlaylistIdx >= pl.songs.length) currentPlaylistIdx = 0;
  renderPlaylistSongs();
}

// ——— Play & Autoplay Within Playlist ———
function playFromPlaylist(idx) {
  currentPlaylistIdx = idx;
  const song = playlists[activePlaylist].songs[idx];
  loadSong(song);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function nextPlaylistSong() {
  const plSongs = playlists[activePlaylist].songs;
  if (!plSongs.length) return;
  currentPlaylistIdx = (currentPlaylistIdx + 1) % plSongs.length;
  playFromPlaylist(currentPlaylistIdx);
}

// ——— Initial Setup ———
renderArtistButtons();
renderSongs(filteredSongs);
renderPlaylists();
renderPlaylistSongs();
