import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare, faI, faF, faD } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SongType from "../../commons/SongType";
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

    const getSongTypeIcon = (type) => {
        switch (type) {
            case SongType.INSTRUMENTAL:
                return faI;
            case SongType.DEMO:
                return faD;
            case SongType.FULL_VERSION:
                return faF;
            default:
                return null;
        }
    };


    const getMarginClass = (type) => {
        switch (type) {
            case SongType.INSTRUMENTAL:
                return "icon-I";
            case SongType.DEMO:
            case SongType.FULL_VERSION:
                return "icon-DF";
            default:
                return "";
        }
    };

    return (
        <div className="library-song" onClick={() => clickSongHandler(song)}>
            <div className="song-description">
                <img src={song.cover} alt={song.name} />
                <div className="song-name">
                    <h3>{song.name}</h3>
                </div>
            </div>
            <div className="song-type-icon-wrapper">
                <FontAwesomeIcon
                    icon={getSongTypeIcon(song.type)}
                    className={`${getMarginClass(song.type)}`}
                />
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