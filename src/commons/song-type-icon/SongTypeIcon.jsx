import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faI, faF, faD } from "@fortawesome/free-solid-svg-icons";
import SongType from "commons/SongType";
import "./SongTypeIcon.css";

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

const SongTypeIcon = ({ type }) => {
    return (
        <div className="song-type-icon-wrapper">
        <FontAwesomeIcon
            icon={getSongTypeIcon(type)}
            className={`${getMarginClass(type)}`}
        />
    </div>
    );
};

export default SongTypeIcon;