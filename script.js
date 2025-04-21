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
    title: "Hijack",
    artist: "A$AP Rocky",
    src: "assets/hijack.mp3",
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
    src: "assets/blowing-minds.mp3",
    cover: "assets/rocky3.jpg"
  }
];

let currentSong = 0;

const songList = document.getElementById("song-list");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playPauseBtn = document.getElementById("playPauseBtn");

function loadSong(index) {
  const song = songs[index];
  currentSong = index;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch(error => {
      console.error("Playback failed:", error);
    });
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}


function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

audio.addEventListener("ended", nextSong);

// Render the song list
songs.forEach((song, index) => {
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
    loadSong(index);
    audio.play();
    playPauseBtn.textContent = "⏸️";
  });
  songList.appendChild(item);
});
