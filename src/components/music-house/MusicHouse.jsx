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
import InfoButton from "../info-button/InfoButton";
import Info from "../info/Info";


function useAppAnimate(isLibraryOpen, isInfoOpen) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        if (isLibraryOpen) {
            animate(".library-container", 
                {
                    width: "350px",
                    background: "linear-gradient(to bottom, rgba(175, 170, 255, 0.95), rgba(255, 170, 175, 0.95))",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
            animate(".library-songs", {opacity:1, pointerEvents: "auto"}, {delay: 0.2, duration: 0.3});
        } else {
            animate(".library-songs", {opacity:0, pointerEvents: "none"}, {duration: 0.2});
            animate(".library-container", 
                {
                    width: "140px",
                    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLibraryOpen]);

    useEffect(() => {
        if (isInfoOpen) {
            animate(".info-container", 
                {
                    width: "350px",
                    backgroundColor: "rgba(70, 60, 56, 0.9)",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
            animate(".info-page", {opacity:1}, {duration: 0.5});
        } else {
            animate(".info-container", 
                {
                    width: "120px",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                }, 
                {
                    type: "spring",
                    damping: 15,
                    duration: 0.5
                });
            animate(".info-page", {opacity:0}, {duration: 0.5});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInfoOpen]);
    return scope;
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
    const [NotificationShow, setNotificationShow] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

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

    const scope = useAppAnimate(isLibraryOpen, isInfoOpen);

    const handleClickOutside = (event) => {
        if (!event.target.closest('.library-container') && isLibraryOpen) {
            setIsLibraryOpen(false);
        }
        if (!event.target.closest('.info-container') && isInfoOpen) {
            setIsInfoOpen(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isLibraryOpen, isInfoOpen]);

    return (
        <div className="container" ref={scope}>
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                src={currentSong.audio}
                ref={audioRef}
                onEnded={songEndHandler}
            ></audio>
            <img className="background-image"
                src="images/bgImg.PNG" alt=""
            ></img>
            <div className="library-container">
                <LibraryButton setisLibraryOpen={setIsLibraryOpen} isLibraryOpen={isLibraryOpen}/>
                <Library 
                className="library"
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                audioRef={audioRef} 
                isPlaying={isPlaying}
                toggleSongActive={toggleSongActive}
            /></div>

            <div className="info-container">
                <InfoButton setIsInfoOpen={setIsInfoOpen} isInfoOpen={isInfoOpen}/>
                <Info 
                    className="info"
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