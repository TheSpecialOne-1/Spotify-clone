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
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const artist = document.getElementById("artist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}

loadSong(currentSong);
