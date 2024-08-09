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
let shuffle = false;
let audioEl = document.createElement("audio");

const musicContainer = document.querySelector(".musicContainer");

function createLayout() {
  const cardImg = document.createElement("img");
  const title = document.createElement("h2");
  const artist = document.createElement("p");
  const navigation = document.createElement("div");
  const playBtn = document.createElement("button");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const shuffleBtn = document.createElement("button");
  const repeatBtn = document.createElement("button");
  const progressContainer = document.createElement("div");
  let progressBar = document.createElement("div");
  const progressData = document.createElement("div");
  let progressStart = document.createElement("p");
  let progressEnd = document.createElement("p");

  cardImg.src = musicArr[songIndex].artwork;
  cardImg.classList.add("cardImg");
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
  progressStart.classList.add("progressStart");
  progressEnd.classList.add("progressEnd");
  progressStart.innerText = "";
  progressEnd.innerText = "";

  musicContainer.appendChild(cardImg);
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
  musicContainer.appendChild(audioEl);

  playBtn.addEventListener("click", () => {
    if (playing) {
      pauseSong();
    } else {
      playSong();
    }
  });

  prevBtn.addEventListener("click", () => {
    prevSong();
  });

  nextBtn.addEventListener("click", () => {
    nextSong();
  });

  shuffleBtn.addEventListener("click", () => {
    shuffleMode();
  });

  repeatBtn.addEventListener("click", () => {
    repeatSong();
  });
}

function playSong() {
  if (audioEl.src !== musicArr[songIndex].url) {
    audioEl.src = musicArr[songIndex].url;
    audioEl.addEventListener("loadedmetadata", () => {
      update();
      document.querySelector(".progressEnd").innerText = minsecTimeFormat(
        audioEl.duration
      );
    });
  }

  audioEl.play();
  playing = true;
  document.querySelector(
    ".playBtn"
  ).innerHTML = `<i class="fa-solid fa-pause"></i>`;

  setInterval(update, 1000);
}

function update() {
  const currentTime = audioEl.currentTime;
  const duration = audioEl.duration;
  // console.log("CURRENT TIME: " + currentTime);
  // console.log("DURATION: " + duration);

  // if(currentTime == duration){
  //   document.querySelector('.palyBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`;
  // }

  const progressWidth = (currentTime / duration) * 100;
  document.querySelector(".progressBar").style.width = `${progressWidth}%`;

  document.querySelector(".progressStart").innerText =
    minsecTimeFormat(currentTime);
  document.querySelector(".progressEnd").innerText = minsecTimeFormat(duration);
}

function minsecTimeFormat(seconds) {
  const currMin = Math.floor(seconds / 60);
  const currSec = Math.floor(seconds % 60);
  return `${currMin}:${currSec < 10 ? "0" : ""}${currSec}`;
}

function pauseSong() {
  audioEl.pause();
  playing = false;
  document.querySelector(
    ".playBtn"
  ).innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function prevSong() {
  if (shuffle == true) {
    shuffleSong();
  } else {
    if (songIndex === 0) {
      songIndex = musicArr.length - 1;
    } else {
      songIndex--;
    }
    playSong();
  }
  updateDetails();
}

function nextSong() {
  if (shuffle == true) {
    shuffleSong();
  } else {
    if (songIndex === musicArr.length - 1) {
      songIndex = 0;
    } else {
      songIndex++;
    }
    playSong();
  }
  updateDetails();
}

function shuffleSong() {
  songIndex = Math.floor(Math.random() * musicArr.length);
  console.log(songIndex);
  playSong();
}

function shuffleMode() {
  shuffle = !shuffle;
  document.querySelector(".shuffleBtn").classList.toggle("active", shuffle);
}

function repeatSong() {
  if (audioEl.loop == true) {
    audioEl.loop = false;
    document.querySelector(".repeatBtn").classList.remove("active");
  } else {
    audioEl.loop = true;
    document.querySelector(".repeatBtn").classList.add("active");
  }
}

function updateDetails() {
  const cardImg = document.querySelector(".cardImg");
  const title = document.querySelector(".title");
  const artist = document.querySelector(".artist");

  cardImg.src = musicArr[songIndex].artwork;
  title.textContent = musicArr[songIndex].title;
  artist.textContent = musicArr[songIndex].artist;
}

createLayout();
