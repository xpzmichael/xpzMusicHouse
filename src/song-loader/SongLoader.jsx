import SongType from '../commons/SongType';

const loadSongs = () => {
    const files = [
        "弃猫效应.mp3",
        "Plastic Memory.mp3",
        "利兹与青鸟.mp3",
        "到这里为止.mp3",
        "温柔的夜 (inst).mp3",
        "到这里为止 (inst).mp3",
        "如果明天世界崩坏 (inst).mp3",
        "傻狗 (inst).mp3",
        "Plastic Memory (inst).mp3",
        "利兹与青鸟 (inst).mp3",
        "1364 (demo).mp3",
        "6451 (demo).mp3"
    ];

    const songs = files.map((file, index) => {
        let default_active = true;
        let type = SongType.FULL_VERSION;
        if (file.includes(SongType.INSTRUMENTAL)) {
            type = SongType.INSTRUMENTAL;
        } else if (file.includes(SongType.DEMO)) {
            type = SongType.DEMO;
            default_active = false;
        }

        return {
            name: file.replace('.mp3', ''),
            cover: './images/yamada-ryou.jpg',
            artist: '小盆栽xpz',
            audio: `./songs/${file}`,
            id: index + 1,
            active: default_active,
            type: type
        };
    });

    return songs;
};

export default loadSongs;