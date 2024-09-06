import React, { useState, useEffect, useRef } from "react";
import "./MusicHouse.css";
import Player from "../player/Player";
import SongPage from "../song-page/SongPage";
import Library from "../library/Library";
import LibraryButton from "../library-button/LibraryButton";
import { useAnimate } from "framer-motion";
import loadSongs from "../../song-loader/SongLoader";


function useLibraryAnimate(isOpen) {
    const [libraryRef, animate] = useAnimate();
    useEffect(() => {
        console.log(`isOpen:${isOpen}`);
        if (isOpen) {
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
                    width: "100px",
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
    }, [isOpen]);
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
    const [isOpen, setIsOpen] = useState(false);


    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            currentTime: current,
            duration,
        });
    };

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    
        if (isPlaying) {
            audioRef.current.load();
            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
            };
        }
    };

    const libraryRef = useLibraryAnimate(isOpen);
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
                className="backgroundVideo"
            ></video>
            <div className="library-container" ref={libraryRef}>
                <LibraryButton setIsOpen={setIsOpen} isOpen={isOpen}/>
                <Library 
                className="library"
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                audioRef={audioRef} 
                isPlaying={isPlaying}
            /></div>
            <div className="musicContainer">
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
        </div>
    );
}

export default MusicHouse;