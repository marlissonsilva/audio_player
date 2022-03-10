//Variáveis
let player = {
    music: document.querySelector('#music'),
    sound: document.querySelector('#sound'),
    photoAlbum: document.querySelector('#photoAlbum'),
    nameMusic: document.querySelector('#nameMusic'),
    author: document.querySelector('#author'),
    minutesLive: document.querySelector('#minutesLive'),
    progress: document.querySelector('#progress'),
    minutesSeconds: document.querySelector('#minutesSeconds'),
    previusSong: document.querySelector('#previusSong'),
    playPause: document.querySelector('#playPause'),
    netxSong: document.querySelector('#nextSong'),
    imgVolume: document.querySelector('#imgVolume'),
    inputVolume: document.querySelector('#inputVolume'),
}

// Contagem e duração da música
function audioTime() {
    let minutes = Math.floor(music.duration / 60)
    let seconds = Math.floor(music.duration % 60)
    let minuteLive = Math.floor(music.currentTime / 60)
    let secondsLive = Math.floor(music.currentTime % 60)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    if (minuteLive < 10) {
        minuteLive = '0' + minuteLive
    }
    if (secondsLive < 10) {
        secondsLive = '0' + secondsLive
    }
    minutesSeconds.innerText = `${minutes}:${seconds}`
    minutesLive.innerText = `${minuteLive}:${secondsLive}`

    minutesSeconds.innerText = `${minutes}:${seconds}`
    minutesLive.innerText = `${minuteLive}:${secondsLive}`

    // observar que 'minutes' e 'minute' sao coisas diferentes
}

// Define um tempo para executar a função
setInterval(audioTime, 1000)

// Controlar o time da musica pelo input
function timeMusic() {
    music.currentTime = progress.value
}


// Play/Pause
let playing = false
function playMusic() {
    if (playing == false) {
        playPause.setAttribute('src', './img/pause-circle.svg')
        music.play()
        return (playing = true)
    } else {
        playPause.setAttribute('src', './img/play-circle.svg')
        music.pause()
        return (playing = false)
    }
}

// Lista de músicas
const musicList = [


    {
        index: 0,
        name: "Será",
        author: 'Legião Urbana',
        src: "./audio/song.ogg",
        photo: "img/album.png"

    },

    {
        index: 1,
        name: "Bad Liar",
        author: 'Imagine Dragons',
        src: "./audio/Imagine Dragons - Bad Liar.mp3",
        photo: "img/fundo.jpg"

    },

    {
        index: 2,
        name: "Believer",
        author: 'Imagine Dragons',
        src: "./audio/Imagine Dragons - Believer.mp3",
        photo: "img/th.jpg"

    }


]

// duracao da musica e progresso de reprodução
function ProgressAudio() {
    progress.max = music.duration
    progress.value = music.currentTime
}

setInterval(ProgressAudio, 50)

let songIndex = 0

function previusMusic() {

    if (songIndex == 0) {
        alert('Você está no inicio da lista de músicas')
        previusMusic(pause)
    }
    songIndex--
    sound.src = musicList[songIndex].src
    nameMusic.innerText = musicList[songIndex].name
    author.innerText = musicList[songIndex].author
    photoAlbum.src = musicList[songIndex].photo


    music.load()
    music.play()

    if (playing == false) {
        playPause.setAttribute('src', './img/pause-circle.svg')
        music.play()
        return (playing = true)
    }

}


function nextMusic() {
    songIndex++

    if (songIndex >= musicList.length) {
        songIndex = 0

    }

    sound.src = musicList[songIndex].src
    nameMusic.innerText = musicList[songIndex].name
    author.innerText = musicList[songIndex].author
    photoAlbum.src = musicList[songIndex].photo


    music.load()
    music.play() // faz com que ao passar a musica reproduza automaticamente

    if (playing == false) {
        playPause.setAttribute('src', './img/pause-circle.svg')
        music.play()
        return (playing = true)
    }
}

let soundMuted = false

function changeVolume() {
    music.volume = inputVolume.value / 100

    if (inputVolume.value == 0) {
        imgVolume.setAttribute('src', './img/volume-x.svg')
        music.muted = true
        soundMuted = true
        return soundMuted
    } else if (inputVolume.value <= 30) {
        imgVolume.setAttribute('src', './img/volume-1.svg')
        music.muted = false
        soundMuted = false
        return soundMuted
    } else {
        imgVolume.setAttribute('src', './img/volume-2.svg')
        music.muted = false
        soundMuted = false
        return soundMuted
    }
}

function mute() {
    if (soundMuted == false) {
        music.muted = true
        imgVolume.setAttribute('src', './img/volume-x.svg')
        inputVolume.value = 0
        soundMuted = true
        return soundMuted
    } else {
        music.muted = false
        imgVolume.setAttribute('src', './img/volume-2.svg')
        inputVolume.value = 50
        soundMuted = false
        return soundMuted

    }
}

window.onload = () => {
    sound.src = musicList[songIndex].src
    nameMusic.innerText = musicList[songIndex].name
    author.innerText = musicList[songIndex].author
    photoAlbum.src = musicList[songIndex].photo

    music.volume = 0.5
}

playPause.addEventListener('click', playMusic)
previusSong.addEventListener('click', previusMusic)
nextSong.addEventListener('click', nextMusic)
progress.addEventListener('input', timeMusic)
inputVolume.addEventListener('input', changeVolume)