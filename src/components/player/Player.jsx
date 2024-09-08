import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import "./Player.css";
import { findNextActiveSong, findPreviousActiveSong } from "../../commons/SongUtil";


const Player = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
}) => {
    const getTime = (time) =>
        //slice(-2) ensures that the time is always displayed in two digits
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const prevSongHandler = async () => {
        await setCurrentSong(findPreviousActiveSong(songs, currentSong));
        if (isPlaying) audioRef.current.play();
    }
    const nextSongHandler = async () => {
        await setCurrentSong(findNextActiveSong(songs, currentSong));
        if (isPlaying) audioRef.current.play();
    }
    return (
        <div className="player">
            <div className="time-control">
                <div className="time-display">
                    <p>{getTime(songInfo.currentTime)}</p>
                    <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
                </div>
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    className="music-bar"
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range"
                />
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={prevSongHandler}
                    size="2x"
                    className="skip-back"
                    icon={faAngleLeft}
                />
                {!isPlaying ? (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        className="play"
                        icon={faPlay}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        className="pause"
                        icon={faPause}
                    />
                )}

                <FontAwesomeIcon
                    onClick={nextSongHandler}
                    size="2x"
                    className="skip-forward"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
}

export default Player;