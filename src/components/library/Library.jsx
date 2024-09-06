import React from "react";
import LibrarySong from "../library-song/LibrarySong";
import "./Library.css";


const Library = ({ songs, setCurrentSong, audioRef, isPlaying}) => {


    return (
        <div className={`library`}>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        key={song.id}
                        setCurrentSong={setCurrentSong}
                        song={song}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;
