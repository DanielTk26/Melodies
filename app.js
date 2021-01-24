const song = document.querySelector(".song");
let songSrcs = [],
  songNumber = 0,
  i = 0;

document.querySelector(".play-button").addEventListener("click", () => {
  if (song.paused) {
    document.querySelector(".play-button").style.background =
      "url('./Group 10.png')";
    document.querySelector(".play-button").style.backgroundSize = "110%";
    song.play();
  } else {
    document.querySelector(".play-button").style.background =
      "url('./Vector 1 (1).png')";
    document.querySelector(".play-button").style.backgroundSize = "100%";
    song.pause();
  }
});

firebase
  .database()
  .ref("MusicFileNames")
  .on("child_added", (s) => {
    document.querySelector(".header").style.height = "80px";
    console.log(s.val());
    songSrcs.push(s.val());
    document.querySelector(".container").innerHTML +=
      "<div class='song-box' onclick = playThisSong(" +
      i++ +
      ")><img src='https://firebasestorage.googleapis.com/v0/b/melodies-58239.appspot.com/o/" +
      s.val() +
      "%2FThumbnail?alt=media&token=8fd8d37index-a19a-436d-bff4-c9cff91775a8' class='song-thumbnail'><div class='artist-name'>" +
      s.val().substring(s.val().indexOf("_") + 1) +
      "</div><div class='song-name'>" +
      s.val().substring(0, s.val().indexOf("_")) +
      "</div><img src='./Vector 4.png' class='play-button'></div>";

    song.src =
      "https://firebasestorage.googleapis.com/v0/b/melodies-58239.appspot.com/o/" +
      songSrcs[0] +
      "%2FAudio?alt=media&token=a7384d13-b869-48cc-9aca-dc614c3da364";
    document.querySelector(".player .song-thumbnail").style.background =
      "url('https://firebasestorage.googleapis.com/v0/b/melodies-58239.appspot.com/o/" +
      songSrcs[0] +
      "%2FThumbnail?alt=media&token=8fd8d37index-a19a-436d-bff4-c9cff91775a8')";
    document.querySelector(".player .song-thumbnail").style.backgroundSize =
      "100%";
    document.querySelector(
      ".player .song-name"
    ).textContent = songSrcs[0].substring(0, songSrcs[0].indexOf("_"));
    document.querySelector(
      ".player .artist-name"
    ).textContent = songSrcs[0].substring(songSrcs[0].indexOf("_") + 1);
  });

function playThisSong(index) {
  songNumber = index;
  song.src =
    "https://firebasestorage.googleapis.com/v0/b/melodies-58239.appspot.com/o/" +
    songSrcs[index] +
    "%2FAudio?alt=media&token=a7384d13-b869-48cc-9aca-dc614c3da364";
  document.querySelector(".play-button").style.background =
    "url('./Group 10.png')";
  document.querySelector(".play-button").style.backgroundSize = "110%";
  song.play();
  document.querySelector(".player .song-thumbnail").style.background =
    "url('https://firebasestorage.googleapis.com/v0/b/melodies-58239.appspot.com/o/" +
    songSrcs[index] +
    "%2FThumbnail?alt=media&token=8fd8d37index-a19a-436d-bff4-c9cff91775a8')";
  document.querySelector(".player .song-thumbnail").style.backgroundSize =
    "100%";
  document.querySelector(".player .song-name").textContent = songSrcs[
    index
  ].substring(0, songSrcs[index].indexOf("_"));
  document.querySelector(".player .artist-name").textContent = songSrcs[
    index
  ].substring(songSrcs[index].indexOf("_") + 1);
}

document.querySelector(".prev-button").addEventListener("click", () => {
  songNumber--;
  if (songNumber < 0) {
    songNumber = songSrcs.length - 1;
  }
  document.querySelector(".play-button").style.background =
    "url('./Vector 1 (1).png')";
  document.querySelector(".play-button").style.backgroundSize = "100%";
  playThisSong(songNumber);
});
document.querySelector(".next-button").addEventListener("click", () => {
  songNumber++;
  if (songNumber >= songSrcs.length) {
    songNumber = 0;
  }
  document.querySelector(".play-button").style.background =
    "url('./Vector 1 (1).png')";
  document.querySelector(".play-button").style.backgroundSize = "100%";
  playThisSong(songNumber);
});
var duration = song.duration;
function updateMusicProgressValue() {
  const progressBar = document.querySelector(".interactive-progress");
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
}
setInterval(updateMusicProgressValue, 700);

document.querySelector(".add-button").addEventListener("click", () => {
  window.open("upload.html", "_blank");
});
window.onload = function () {};
