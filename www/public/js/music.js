const audioElement = new Audio('/sound/404.mp3');
const playButtonElement = document.getElementById('play-button');
let isAudioPlaying = false;

const toggleAudioPlayback = () => {
	if (isAudioPlaying) {
		audioElement.pause();
		isAudioPlaying = false;
		playButtonElement.textContent = '🎵 Play Music';
	} else {
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
};

playButtonElement.addEventListener('click', () => toggleAudioPlayback());


const autoStartAudio = () => {
	audioElement.play().then(() => {
		playButtonElement.textContent = '🔇 Pause Music';
		isAudioPlaying = true;
	}).catch(err => {
		if (err.name === 'NotAllowedError') {
			playButtonElement.textContent = '🎵 Play Music';
			isAudioPlaying = false;
		}
	});
};

autoStartAudio();