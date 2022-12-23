const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progresscontainer')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//song titles

const songs =['Te quiero mucho mucho mucho', 'Mis memorias contigo son las mas preciadas',
'Te amare por esta y todas las navidades que vengan','Contigo un concierto inolvidable','En mi corazon tienes un lugar especial',
'Quiero pasar toda mi vida a tu ladito','Feliz navidad de parte de Joseph',
'Vales mas que todo el dinero del mundo y yo te adoro','Te amo mucho deberiamos casarnos',
'De mi artista favorita para mi persona favorita en el mundo','Te regalo mi todo, pues te amo',
'No importa lo dificil que sea la vida, siempre a tu lado estare, no me molestaria si nos fucionamos']

//keep track of the songs

let songIndex = 0

//INTIALY LOAD OUR SONGS

loadSong(songs[songIndex])

//update somg details
function loadSong(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`

}

function playSong(){
musicContainer.classList.add('play')
playBtn.querySelector('i.fas').classList.remove('fa-play')
playBtn.querySelector('i.fas').classList.add('fa-pause')

audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}
function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])

    playSong()
}
function nextSong(){
    songIndex++

    if(songIndex > songs.length -1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()

}
function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}
function setProgess (e){
    const width = this.clientWidth
    const clickX =e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
// event listeners
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

//change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgess)

audio.addEventListener('ended', nextSong)