import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "./LibraryButton.css";

const LibraryButton = ({ setisLibraryOpen, isLibraryOpen }) => {
  return (
    <libraryButton className="library-button">
      <button className="library-toggle"
        onClick={() => {
          setisLibraryOpen(!isLibraryOpen);
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </libraryButton>
  );
};

export default LibraryButton;
