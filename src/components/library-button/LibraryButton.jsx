import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "./LibraryButton.css";

const LibraryButton = ({ setisLibraryOpen, isLibraryOpen }) => {
  return (
    <div className="library-button">
      <button className="library-toggle"
        onClick={() => {
          setisLibraryOpen(!isLibraryOpen);
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default LibraryButton;
