
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const themeToggle = document.getElementById('theme-toggle');
    const shuffleButton = document.getElementById('shuffle');
    const body = document.body;
    const albumArt = document.getElementById('album-art');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');

    let songsData = [];

    function updateMediaSession(song) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.name,
                artist: song.artist,
                album: song.album || '',
                artwork: [
                    { src: song.imgUrl, sizes: '96x96', type: 'image/jpeg' },
                    { src: song.imgUrl, sizes: '128x128', type: 'image/jpeg' },
                    { src: song.imgUrl, sizes: '192x192', type: 'image/jpeg' },
                    { src: song.imgUrl, sizes: '256x256', type: 'image/jpeg' },
                    { src: song.imgUrl, sizes: '384x384', type: 'image/jpeg' },
                    { src: song.imgUrl, sizes: '512x512', type: 'image/jpeg' },
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => audio.play());
            navigator.mediaSession.setActionHandler('pause', () => audio.pause());
        }
    }

    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            songsData = data.songs;
            updatePlayer(songsData[5]);
        })
        .catch(error => console.error('Error loading songs:', error));

    function updatePlayer(song) {
        audio.src = song.songUrl;
        albumArt.src = song.imgUrl;
        songTitle.textContent = song.name;
        songArtist.textContent = song.artist;
        updateMediaSession(song);
    }

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    function playRandomSong() {
        if (songsData.length === 0) return;
        const randomIndex = Math.floor(Math.random() * songsData.length);
        const song = songsData[randomIndex];
        updatePlayer(song);
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
    }

    shuffleButton.addEventListener('click', playRandomSong);
       
