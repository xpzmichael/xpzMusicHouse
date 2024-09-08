
export function findNextActiveSong(songs, currentSong) {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextIndex = (currentIndex + 1) % songs.length;
    while (!songs[nextIndex].active) {
        nextIndex = (nextIndex + 1) % songs.length;
    }
    return songs[nextIndex];
}

export function findPreviousActiveSong(songs, currentSong) {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let previousIndex = (currentIndex - 1) % songs.length;
    while (!songs[previousIndex].active) {
        previousIndex = (previousIndex - 1) % songs.length;
    }
    return songs[previousIndex];
}