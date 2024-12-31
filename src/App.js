import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const replay = document.querySelector(".replay");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    // Sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    // Time Display
    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();

    // Duration
    const timeSelect = document.querySelectorAll(".time-select button");
    let fakeDuration = 600;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;

    // Change Sound and Video
    sounds.forEach((sound) => {
      sound.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
      });
    });

    // Play and Pause Song
    play.addEventListener("click", function () {
      checkPlaying(song);
    });

    // Restart Song
    replay.addEventListener("click", function () {
      restartSong(song);
      song.play(); // Replay the song after resetting
    });

    const restartSong = (song) => {
      song.currentTime = 0;
    };

    // Time Selection
    timeSelect.forEach((option) => {
      option.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(
          fakeDuration / 60
        )}:${Math.floor(fakeDuration % 60)}`;
      });
    });

    const checkPlaying = (song) => {
      if (song.paused) {
        song.play();
        video.play();
        play.src = "assets/svg/pause.svg"; // Update icon for pause
      } else {
        song.pause();
        video.pause();
        play.src = "assets/svg/play.svg"; // Update icon for play
      }
    };

    // Update Time and Outline
    song.ontimeupdate = function () {
      let currentTime = song.currentTime;
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);
      timeDisplay.textContent = `${minutes}:${seconds}`;

      let progress =
        outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "assets/svg/play.svg";
        video.pause();
      }
    };
  }, []);
  return (
    <div className="App">
      <main role="main" className="pt-0">
        <div className="app">
          <div className="vid-container">
            <video loop>
              <source src="assets/video/rain.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="time-select">
            <button data-time={120}>2 Minutes</button>
            <button data-time={300} className="medium-mins">
              5 Minutes
            </button>
            <button data-time={600} className="long-mins">
              10 Minutes
            </button>
          </div>
          <div className="player-container">
            <audio className="song">
              <source src="assets/sounds/rain.mp3" />
            </audio>
            <img src="assets/svg/play.svg" className="play" alt="Play Button" />
            <svg
              className="track-outline"
              width={453}
              height={453}
              viewBox="0 0 453 453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="226.5"
                cy="226.5"
                r="216.5"
                stroke="white"
                strokeWidth={20}
              />
            </svg>
            <svg
              className="moving-outline"
              width={453}
              height={453}
              viewBox="0 0 453 453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="226.5"
                cy="226.5"
                r="216.5"
                stroke="#018EBA"
                strokeWidth={20}
              />
            </svg>
            <img
              src="assets/svg/replay.svg"
              className="replay position-absolute bottom-0"
              alt="Replay Button"
            />
            <h3 className="time-display">0:00</h3>
          </div>
          <div className="sound-picker">
            <button
              data-sound="assets/sounds/rain.mp3"
              data-video="assets/video/rain.mp4"
            >
              <img src="assets/svg/rain.svg" alt="Rain" />
            </button>
            <button
              data-sound="assets/sounds/beach.mp3"
              data-video="assets/video/beach.mp4"
            >
              <img src="assets/svg/beach.svg" alt="Beach" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
