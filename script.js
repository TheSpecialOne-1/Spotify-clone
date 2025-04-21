const songs = [
  {
    title: "Drugs You Should Try It",
    artist: "Travis Scott",
    src: "assets/drugs-you-should-try-it.mp3",
    cover: "https://picsum.photos/id/237/400/400"
  },
  {
    title: "Top Floor",
    artist: "Travis Scott",
    src: "assets/top-floor.mp3",
    cover: "https://picsum.photos/id/1015/400/400"
  },
  {
    title: "Down In Atlanta",
    artist: "Travis Scott",
    src: "assets/down-in-atlanta.mp3",
    cover: "https://picsum.photos/id/1005/400/400"
  },
  {
    title: "Hijack",
    artist: "A$AP Rocky",
    src: "assets/hijack.mp3",
    cover: "https://picsum.photos/id/1003/400/400"
  },
  {
    title: "ASAP Forever",
    artist: "A$AP Rocky",
    src: "assets/asap-forever.mp3",
    cover: "https://picsum.photos/id/1021/400/400"
  },
  {
    title: "Blowing Minds",
    artist: "A$AP Rocky",
    src: "assets/blowing-minds.mp3",
    cover: "https://picsum.photos/id/1025/400/400"
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
    audio.play();
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
