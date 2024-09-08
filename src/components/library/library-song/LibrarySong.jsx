import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SongTypeIcon from "commons/song-type-icon/SongTypeIcon";
import "./LibrarySong.css";

const LibrarySong = ({
    song,
    setCurrentSong,
    audioRef,
    isPlaying,
    toggleSongActive,
}) => {

    const clickSongHandler = async () => {
        await setCurrentSong(song);
        if (isPlaying) audioRef.current.play();
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation(); // Stop the event from bubbling up
        toggleSongActive(song.id); 
    };


    return (
        <div className="library-song" onClick={() => clickSongHandler(song)}>
            <div className="song-description">
                <img src={song.cover} alt={song.name} />
                <div className="song-name">
                    <h3>{song.name}</h3>
                </div>
            </div>
            <div className="song-type-icon-container">
                <SongTypeIcon type={song.type} />
            </div>
            <motion.div 
                className="checkbox-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <FontAwesomeIcon
                    icon={song.active ? faSquareCheck : faSquare}
                    className="checkbox"
                    onClick={handleCheckboxClick}
                />
            </motion.div>
        </div>
    )
}

export default LibrarySong;