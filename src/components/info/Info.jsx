import React from "react";
import SongTypeIcon from "commons/song-type-icon/SongTypeIcon";
import SongType from "commons/SongType";
import "./Info.css";

const Info = () => {
    return (
        <div className={"info-page"}>
            <div className="xpz-music-house-title">xpz's Music House</div>
            <div className="welcome">Welcome to xpz's Music House!</div>
            <div className="info-body">
                All songs you see here are original songs composed by me. <br />
                You may click the Library button on the top left corner to view the full list of songs. <br />
                For each song, you may toggle the checkbox to add or remove it from the playlist. <br /><br />
                There are 3 types of songs: <br />
                <div className="icon-with-text">
                    <div className="icon-wrapper">
                        <SongTypeIcon type={SongType.INSTRUMENTAL} />
                    </div>
                    <span className="text-wrapper">
                        <i>: Instrumental</i>
                        <p>No vocal version</p>
                    </span>
                </div>
                <div className="icon-with-text">
                    <div className="icon-wrapper">
                        <SongTypeIcon type={SongType.FULL_VERSION} />
                    </div>
                    <span className="text-wrapper">
                        <i>: Full Version</i>
                        <p>With vocal, fully produced</p>
                    </span>
                </div>
                <div className="icon-with-text">
                    <div className="icon-wrapper">
                        <SongTypeIcon type={SongType.DEMO} />
                    </div>
                    
                    <span className="text-wrapper">
                        <i>: Demo Version</i>
                        <p>No Vocal and not produced</p>
                    </span>
                </div>
                <i className="note">Note: Demo songs are deselected from the playlist by default. </i>
                <br /><br />The code of this Web App is Open-Sourced on <a href="https://github.com/xpzmichael/xpzMusicHouse">Github</a>.
            </div>
        </div>
    );
}

export default Info;