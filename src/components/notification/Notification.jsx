import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Notification.css";

const Notification = ({ message, handleCloseNotification }) => {
    return (
        <motion.div
            className="notification"
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
        <div className="notification-content">
            <p>{message}</p>
            <motion.button 
                className="close-button" 
                onClick={handleCloseNotification}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <FontAwesomeIcon icon={faTimes} />
            </motion.button>
        </div>
        </motion.div>
    );
}

export default Notification;
