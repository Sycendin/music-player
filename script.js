const image = document.querySelector('#image');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector("#progress-container")
const progress = document.querySelector("#progress")
const currentTimeEl = document.querySelector("#current-time")
const durationEl = document.querySelector('#duration')
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

//Music
const songs = [
    {
        name: 'music-1',
        displayName: 'The Rumbling',
        artist: 'SiM'
    },
    {
        name: 'music-2',
        displayName: 'Art of War',
        artist: 'The Discrepancies'
    },
    {
        name: 'music-3',
        displayName: 'The Fall',
        artist: 'Blue Stahil'
    },
    {
        name: 'music-4',
        displayName: 'A Ghost\'s Pumpkin Soup',
        artist: 'Hunnid-P And Tomoya Ohtani'
    }
]

let isPlaying = false;

const playSong = () =>{
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

const pauseSong = () =>{
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

playBtn.addEventListener('click', () =>{
    isPlaying ? pauseSong() :playSong()
})

// Update DOm
const loadSong = (song) =>{
   
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}
//Current song
let songIndex = 0;

const nextSong = () =>{
    
    songIndex++
    if (songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()

}

const prevSong = () =>{
    songIndex--
    if (songIndex <= -1){
        songIndex = (songs.length -1)
    }
    loadSong(songs[songIndex])
    playSong()
    
}
// On load select first song
loadSong(songs[songIndex])

//update progressbar
const updateProgressBar = (e) =>{
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration element to avoid NaN value
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        }
        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }

} 
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX /width) * duration;
}

//Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);