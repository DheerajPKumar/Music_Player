var musicArr = [
  {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: "1",
  },
  {
    title: "Bad Liar",
    artist: "Imagine Dragons",
    artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    id: "2",
  },
  {
    title: "Faded",
    artist: "Alan Walker",
    artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    url: "https://samplesongs.netlify.app/Faded.mp3",
    id: "3",
  },
  {
    title: "Hate Me",
    artist: "Ellie Goulding",
    artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    id: "4",
  },
  {
    title: "Solo",
    artist: "Clean Bandit",
    artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    url: "https://samplesongs.netlify.app/Solo.mp3",
    id: "5",
  },
  {
    title: "Without Me",
    artist: "Halsey",
    artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    url: "https://samplesongs.netlify.app/Without%20Me.mp3",
    id: "6",
  },
];

let songIndex = 0;
let playing = false;
let audioEl = new Audio(musicArr[songIndex].url);

const musicContainer = document.querySelector(".musicContainer");

function createLayout(musicArr) {
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const artist = document.createElement("p");
  const navigation = document.createElement("div");
  const playBtn = document.createElement("button");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const shuffleBtn = document.createElement("button");
  const repeatBtn = document.createElement("button");
  const progressContainer = document.createElement("div");
  const progressBar = document.createElement("div");
  const progressData = document.createElement("div");
  const progressStart = document.createElement("p");
  const progressEnd = document.createElement("p");

  img.src = musicArr[songIndex].artwork;
  img.classList.add("img");
  title.textContent = musicArr[songIndex].title;
  title.classList.add("title");
  artist.textContent = musicArr[songIndex].artist;
  artist.classList.add("artist");
  navigation.classList.add("navigation");
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  playBtn.classList.add("playBtn");
  prevBtn.innerHTML = `<i class="fa-solid fa-backward"></i>`;
  prevBtn.classList.add("prevBtn");
  nextBtn.innerHTML = `<i class="fa-solid fa-forward"></i>`;
  nextBtn.classList.add("nextBtn");
  shuffleBtn.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
  shuffleBtn.classList.add("shuffleBtn");
  repeatBtn.innerHTML = `<i class="fa-solid fa-repeat"></i>`;
  repeatBtn.classList.add("repeatBtn");
  progressContainer.classList.add("progressContainer");
  progressBar.classList.add("progressBar");
  progressData.classList.add("progressData");
  progressStart.innerText = "0:00";
  progressEnd.innerText = "0:00";

  musicContainer.appendChild(img);
  musicContainer.appendChild(title);
  musicContainer.appendChild(artist);
  musicContainer.appendChild(progressData);
  progressContainer.appendChild(progressBar);
  progressData.appendChild(progressStart);
  progressData.appendChild(progressEnd);
  musicContainer.appendChild(progressContainer);
  navigation.appendChild(shuffleBtn);
  navigation.appendChild(prevBtn);
  navigation.appendChild(playBtn);
  navigation.appendChild(nextBtn);
  navigation.appendChild(repeatBtn);
  musicContainer.appendChild(navigation);

  playBtn.addEventListener("click", () => {
    if (playing) {
      pauseSong();
    } else {
      playSong();
    }
  });
}

function playSong() {
  audioEl.src = musicArr[songIndex].url;
  let val = audioEl.duration;
  console.log(val);
  audioEl.play();
  playing = true;
  document.querySelector(
    ".playBtn"
  ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
  updateSongDetails();
}

function pauseSong() {
  audioEl.pause();
  playing = false;
  document.querySelector(
    ".playBtn"
  ).innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function updateSongDetails() {
  const img = document.querySelector(".img");
  const title = document.querySelector(".title");
  const artist = document.querySelector(".artist");

  img.src = musicArr[songIndex].artwork;
  title.textContent = musicArr[songIndex].title;
  artist.textContent = musicArr[songIndex].artist;
}

createLayout(musicArr);
