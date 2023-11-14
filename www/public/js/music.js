const audioElement = new Audio('/sound/404.mp3');
const playButtonElement = document.getElementById('play-button');
let isAudioPlaying = false;

function toggleAudioPlayback() {
	if (isAudioPlaying) {
		audioElement.pause();
		isAudioPlaying = false;
		playButtonElement.textContent = '🎵 Play Music';
	} else {
		audioElement.play().then(() => {
			playButtonElement.textContent = '🔇 Pause Music';
			isAudioPlaying = true;
		}).catch((error) => {
			if (error.name === 'NotAllowedError') {
				playButtonElement.textContent = '🎵 Play Music';
				isAudioPlaying = false;
			}
		});
	}
}

playButtonElement.addEventListener('click', () => toggleAudioPlayback());


function autoStartAudio() {
	audioElement.play().then(() => {
		playButtonElement.textContent = '🔇 Pause Music';
		isAudioPlaying = true;
	}).catch(err => {
		if (err.name === 'NotAllowedError') {
			playButtonElement.textContent = '🎵 Play Music';
			isAudioPlaying = false;
		}
	});
}

autoStartAudio();