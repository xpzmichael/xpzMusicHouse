import React, { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import "./SongPage.css";

const SongPage = ({ currentSong, isPlaying }) => {
    const [scope, animate] = useAnimate()
    const animationRef = useRef(null);

    useEffect(() => {
        // Create the animation instance only once
        animationRef.current = animate(scope.current, { rotate: 360 }, {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
        });
        
        // Cleanup function to stop the animation when the component unmounts
        return () => {
            animationRef.current.stop();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // stop spinging when music is paused
        if (isPlaying) {
            animationRef.current.play();
        } else {
            animationRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="song-container">
            <p className="musicTitle">{currentSong.name}</p>
            <p className="musicArtist">{currentSong.artist}</p>
            <div
                className="songAvatarWrapper"
                ref={scope}
            >
                <img
                    src={currentSong.cover}
                    alt="Song Avatar"
                    className="songAvatar"
                />
            </div>
        </div>
    );
};

export default SongPage;