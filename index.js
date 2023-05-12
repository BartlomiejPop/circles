console.log("circles");
const containerEl = document.querySelector(".container");
const circleEl = document.querySelector(".circle");
const scoreEl = document.querySelector(".score");
const finalScoreEl = document.querySelector(".final-score");
const playAgainBtn = document.querySelector(".play-again");
const playMusicBtn = document.querySelector(".pause-resume");
const musicVolume = document.querySelector(".volume");
const gameOverEl = document.querySelector(".game-over");
const timerBgEl = document.querySelector(".timer-bg");
const musicEl = document.getElementById("audio");
let scorePoints = 0;
let timeOut;
let timer;

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, 0)}`;
}

const generateCircle = (timer) => {
	circleEl.style.display = "flex";
	circleEl.style.top = Math.random(screen.height) * 0.8 * screen.height + "px";
	circleEl.style.left = Math.random(screen.width) * 0.8 * screen.width + "px";
	circleEl.style.backgroundColor = getRandomHexColor();
	timeOut = setTimeout(() => {
		gameOver();
	}, timer);
};

const gameOver = () => {
	timerBgEl.style.display = "none";
	circleEl.style.display = "none";
	gameOverEl.style.display = "flex";
	finalScoreEl.textContent = `Time's up! Your score is: ${scorePoints}`;
	scorePoints = 0;
	scoreEl.innerText = scorePoints;
};

circleEl.addEventListener("click", () => {
	scorePoints++;
	if (scorePoints === 10) {
		timer = 800;
		timerBgEl.textContent = "0.8s";
	} else if (scorePoints === 50) {
		timer = 700;
		timerBgEl.textContent = "0.7s";
	} else if (scorePoints === 100) {
		timer = 600;
		timerBgEl.textContent = "0.6s";
	} else if (scorePoints === 150) {
		timer = 550;
		timerBgEl.textContent = "0.55s";
	} else if (scorePoints === 200) {
		timer = 500;
		timerBgEl.textContent = "0.5s";
	}
	clearTimeout(timeOut);
	generateCircle(timer);

	scoreEl.innerText = scorePoints;
});

playAgainBtn.addEventListener("click", () => {
	timer = 1000;
	timerBgEl.textContent = "1s";
	timerBgEl.style.display = "block";
	gameOverEl.style.display = "none";
	generateCircle(timer);
});

playMusicBtn.addEventListener("click", () => {
	if (playMusicBtn.innerHTML == `<i class="fa-solid fa-play"></i>`) {
		musicEl.play();
		playMusicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
	} else {
		musicEl.pause();
		playMusicBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
	}
});

musicVolume.addEventListener("input", () => {
	musicEl.volume = musicVolume.value / 100;
});

// document.getElementById("mySound").play();
circleEl.style.display = "none";