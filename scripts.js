// elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer')

const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const playPause = player.querySelector('.toggle')
const ranges = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('[data-skip]')

//functions

function togglePlay() {
    if (video.paused || video.ended) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    playPause.textContent = icon;
}

function progressLoop() {
    progressBar.value = ((video.currentTime / video.duration) * 100);
    progressBar.style.flexBasis = `${progressBar.value}%`;
}

function skipAhead(event) {
    const skipTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = skipTime;
    
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
   
function handleRangeUpdate() {
    video[this.name] = this.value;
}





//eventlisteners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
playPause.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', progressLoop)
playPause.addEventListener('timeupdate', progressLoop)

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', skipAhead);
progress.addEventListener('mousemove', (event) => mousedown && skipAhead(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

