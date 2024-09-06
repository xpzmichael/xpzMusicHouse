const loadSongs = () => {
    const files = [
        "quiet-night.mp3",
        "1364.mp3",
        "6451.mp3",
        "6451_1.mp3",
        "plastic memory.mp3",
        "利兹与青鸟.mp3",
        "到这里为止.mp3",
        "如果明天世界崩坏.mp3"
    ];

    const songs = files.map((file, index) => ({
        name: file.replace('.mp3', ''),
        cover: './images/yamada-ryou.jpg',
        artist: '小盆栽xpz',
        audio: `./songs/${file}`,
        id: index + 1,
        active: true
    }));

    return songs;
};

export default loadSongs;