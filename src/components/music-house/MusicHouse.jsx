import React, { useState, useEffect, useRef } from "react";
import "./MusicHouse.css";
import Player from "../player/Player";
import SongPage from "../song-page/SongPage";
import Library from "../library/Library";
import LibraryButton from "../library-button/LibraryButton";
import { useAnimate, AnimatePresence } from "framer-motion";
import loadSongs from "../../song-loader/SongLoader";
import { findNextActiveSong } from "../../commons/SongUtil";
import Notification from "../notification/Notification";


function useLibraryAnimate(isLibraryOpen) {
    const [libraryRef, animate] = useAnimate();
    useEffect(() => {
        if (isLibraryOpen) {
            animate(libraryRef.current, 
                {
                    width: "350px",
                    background: "linear-gradient(to bottom, rgba(175, 170, 255, 0.95), rgba(255, 170, 175, 0.95))",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
            animate(".library-songs", {opacity:1, pointerEvents: "auto"}, {duration: 0.5});
        } else {
            animate(libraryRef.current, 
                {
                    width: "120px",
                    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
            animate(".library-songs", {opacity:0, pointerEvents: "none"}, {duration: 0.5});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLibraryOpen]);
    return libraryRef;
}



const MusicHouse = () => {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);

    useEffect(() => {
        setSongs(loadSongs());
        setCurrentSong(loadSongs()[0]);
    }, []);

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [NotificationShow, setNotificationShow] = useState(true);

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            currentTime: current,
            duration,
        });
    };

    const songEndHandler = async () => {
        await setCurrentSong(findNextActiveSong(songs, currentSong));
    
        if (isPlaying) {
            audioRef.current.load();
            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
            };
        }
    };

    const toggleSongActive = (id) => {
        const activeSongs = songs.filter(song => song.active);
        const isLastActiveSong = activeSongs.length === 1 && activeSongs[0].id === id;
    
        setSongs(
            songs.map((song) => {
                if (song.id === id) {
                    // Prevent deactivating the last active song
                    if (isLastActiveSong) {
                        setNotificationShow(true);
                        return song;
                    }
                    return {
                        ...song,
                        active: !song.active,
                    };
                }
                return song;
            })
        );
    };

    const handleCloseNotification = () => {
        setNotificationShow(false);
    }

    const libraryRef = useLibraryAnimate(isLibraryOpen);


    return (
        <div className="container">
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                src={currentSong.audio}
                ref={audioRef}
                onEnded={songEndHandler}
            ></audio>
            <video 
                src="./videos/video1.mp4" 
                autoPlay loop muted 
                className="background-video"
            ></video>
            <div className="library-container" ref={libraryRef}>
                <LibraryButton setisLibraryOpen={setIsLibraryOpen} isLibraryOpen={isLibraryOpen}/>
                <Library 
                className="library"
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                audioRef={audioRef} 
                isPlaying={isPlaying}
                toggleSongActive={toggleSongActive}
            /></div>
            <div className="music-container">
                <SongPage currentSong={currentSong} isPlaying={isPlaying}/>
                <Player 
                    currentSong={currentSong} 
                    isPlaying={isPlaying} 
                    audioRef={audioRef} 
                    songInfo={songInfo}
                    setSongInfo={setSongInfo}
                    setIsPlaying={setIsPlaying} 
                    songs={songs}
                    setCurrentSong={setCurrentSong}
                    />
            </div>
            <div className="notification-container">
                <AnimatePresence>
                    {NotificationShow && 
                    <Notification 
                        message='You need at least one active song!' 
                        handleCloseNotification={handleCloseNotification}
                    />}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default MusicHouse;