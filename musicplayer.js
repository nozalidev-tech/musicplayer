const songs = [
    { title: "Balochi Music", artist: "Artist A", src: "balochi-music.mp3" },
    { title: "Surah baqrah", artist: "Artist B", src: "cutFile_Surat_Al_Baqarah_Heart_Touching_reaction____Surah_Baqarah_Full____by_Abdul_Rahman_Mossad128k_2.mp3" },
    { title: "Song Three", artist: "Artist C", src: "song3.mp3" }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(i) {
    title.textContent = songs[i].title;
    artist.textContent = songs[i].artist;
    audio.src = songs[i].src;
    highlightSong();
}

function playPause() {
    audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
}

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong); // ✅ Autoplay next song

songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        index = i;
        loadSong(index);
        audio.play();
    };
    playlist.appendChild(li);
});

function highlightSong() {
    document.querySelectorAll("li").forEach((li, i) => {
        li.classList.toggle("active", i === index);
    });
}

loadSong(index);
volume.value = 0.5;
