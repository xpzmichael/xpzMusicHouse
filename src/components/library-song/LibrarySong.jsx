import React from "react";
import "./LibrarySong.css";

const LibrarySong = ({
    song,
    setCurrentSong,
    audioRef,
    isPlaying,
}) => {
    const selectSongHandler = async () => {
        await setCurrentSong(song);
        if (isPlaying) audioRef.current.play();
    }

    return (
        <div className="library-song" onClick={() => selectSongHandler(song)}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
            </div>
        </div>
    )
}

export default LibrarySong;
