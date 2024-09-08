import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./InfoButton.css";

const InfoButton = ({ setIsInfoOpen, isInfoOpen }) => {
  return (
    <motion.div className="info-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <FontAwesomeIcon 
        icon={faInfoCircle} 
        className="info-icon"
        onClick={() => {
          setIsInfoOpen(!isInfoOpen);
        }} 
      />
    </motion.div>
  );
};

export default InfoButton;