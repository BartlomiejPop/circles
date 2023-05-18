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
const clickSound = document.getElementById("click");
const bonusSound = document.getElementById("bonus");
const recordEl = document.querySelector(".record");
const lightmodeEl = document.querySelector(".lightmode");
const darkmodeEl = document.querySelector(".darkmode");
let scorePoints = 0;
let timeOut;
let timer;
let bonusTime = 0;
let bgInterval;
clickSound.volume = 0.1;
bonusSound.volume = 0.2;

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, 0)}`;
}

const generateCircle = (timer) => {
	circleEl.style.display = "flex";
	circleEl.style.top =
		window.innerHeight * 0.05 +
		Math.random(window.innerHeight) * 0.7 * window.innerHeight +
		"px";
	circleEl.style.left =
		window.innerWidth * 0.05 +
		Math.random(window.innerWidth) * 0.7 * window.innerWidth +
		"px";
	circleEl.style.backgroundColor = getRandomHexColor();
	timeOut = setTimeout(() => {
		gameOver(scorePoints);
	}, timer);
};

const gameOver = (record) => {
	timerBgEl.style.display = "none";
	circleEl.style.display = "none";
	gameOverEl.style.display = "flex";
	finalScoreEl.textContent = `Time's up! Your score is: ${scorePoints}`;
	scorePoints = 0;
	scoreEl.innerText = scorePoints;
	clearInterval(bgInterval);
	if (localStorage.getItem("NewRecord") == 0) {
		localStorage.setItem("NewRecord", record);
	}
	if (localStorage.getItem("NewRecord") < record) {
		localStorage.setItem("NewRecord", record);
	}
	recordEl.textContent = ` record: ${localStorage.getItem("NewRecord")}`;
};

const handleCircleClick = () => {
	circleEl.style.display = "none";
	clickSound.play();
	scorePoints++;
	timerBgEl.textContent = timer + +bonusTime + "ms";
	clearTimeout(timeOut);
	generateCircle(timer);
	scoreEl.innerText = scorePoints;
	if (scorePoints >= 100 && scorePoints < 200) {
		circleEl.style.border = " 10px double rgb(255, 255, 255)";
	} else if (scorePoints >= 200 && scorePoints < 300) {
		circleEl.style.border = " 10px dotted rgb(255, 255, 255)";
	} else if (scorePoints >= 300) {
		circleEl.style.border = " 8px dashed rgb(255, 255, 255)";
	}
};

const generateEvent = () => {
	const circleEvent = document.createElement("div");
	circleEvent.classList.add("circle-event");
	circleEvent.style.display = "flex";
	circleEvent.innerHTML = "<span class='score'>+0.1s</span>";
	circleEvent.style.top =
		Math.random(window.innerHeight) * 0.5 * window.innerHeight + "px";
	circleEvent.style.left =
		Math.random(window.innerWidth) * 0.5 * window.innerWidth + "px";
	containerEl.appendChild(circleEvent);
	setTimeout(() => {
		circleEvent.style.display = "none";
	}, 1200);
	circleEvent.addEventListener("mousedown", () => {
		timer += 100;
		timerBgEl.textContent = timer + +bonusTime + "ms";
		bonusSound.play();
		circleEvent.style.display = "none";
	});
};

const updateTimerBg = () => {
	timer -= 10;
	timerBgEl.textContent = timer + "ms";
};

const setDarkMode = () => {
	playAgainBtn.style.backgroundColor = " rgb(255, 255, 255, 0.2)";
	playAgainBtn.style.color = " rgb(255, 255, 255, 0.5)";
	document.querySelector("body").style.backgroundImage = "url(darkModeBg.jpg)";
	document.querySelector("body").style.backgroundSize = "37px";
	document.querySelector("body").style.animation =
		"bg-scrolling 0.4s infinite linear";
	timerBgEl.style.color = "rgb(150, 150, 150,0.35)";
	playMusicBtn.style.backgroundColor = "rgb(255, 255, 255, 0.2)";
	playMusicBtn.style.color = " rgb(255, 255, 255, 0.5)";
	localStorage.setItem("mode", "dark");
	circleEl.style.boxShadow = "9px 9px 44px 16px rgb(128, 129, 141)";
};

const setLightMode = () => {
	document.querySelector("body").style.background = "";
	playAgainBtn.style.backgroundColor = " rgb(119, 119, 119, 0.15)";
	timerBgEl.style.color = "rgb(154, 154, 154, 0.3)";
	document.querySelector("body").style.backgroundSize = "";
	document.querySelector("body").style.animation =
		"bg-scrolling 0.32s infinite linear";
	playMusicBtn.style.backgroundColor = " rgba(66, 68, 90, 0.1)";
	playAgainBtn.style.color = " rgb(119, 119, 119)";
	playMusicBtn.style.color = " rgb(119, 119, 119)";
	localStorage.setItem("mode", "light");
	circleEl.style.boxShadow = "9px 9px 44px 16px rgb(128, 129, 141)";
};

const setColorMode = () => {
	if (localStorage.getItem("mode") === "dark") {
		setDarkMode();
	} else {
		setLightMode();
	}
};

circleEl.addEventListener("mousedown", () => {
	handleCircleClick();
	const RNGvalue = Math.random(1);
	if (RNGvalue < 0.04) {
		generateEvent();
	}
});

// OPTIONS

playAgainBtn.addEventListener("click", () => {
	timer = 1000;
	bonusTime = 0;
	timerBgEl.textContent = timer + "ms";
	timerBgEl.style.display = "block";
	gameOverEl.style.display = "none";
	setTimeout(() => {
		generateCircle(timer);
	}, 500);
	bgInterval = setInterval(updateTimerBg, 1000);
	circleEl.style.border = " 8px solid rgb(255, 255, 255)";
});

playMusicBtn.addEventListener("mousedown", () => {
	if (playMusicBtn.innerHTML == `<i class="fa-solid fa-play"></i>`) {
		musicEl.play();
		musicEl.volume = musicVolume.value / 100;
		playMusicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
	} else {
		musicEl.pause();
		playMusicBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
	}
});

musicVolume.addEventListener("input", () => {
	musicEl.volume = musicVolume.value / 100;
});

darkmodeEl.addEventListener("mousedown", setDarkMode);
lightmodeEl.addEventListener("mousedown", setLightMode);

setColorMode();

// window.addEventListener("mousedown", (e) => {
// 	console.log(e);
// });
