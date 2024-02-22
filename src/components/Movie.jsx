import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Watch(props) {
  const { id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    const handleFullscreen = () => {
      const iframe = document.getElementById("videoFrame");

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      }
    };

    // Add event listener for the fullscreen button click within the iframe
    const fullscreenButton = document.getElementById("fullscreenButton");
    if (fullscreenButton) {
      fullscreenButton.addEventListener("click", handleFullscreen);
    }

    return () => {
      // Cleanup: remove event listener when the component unmounts
      if (fullscreenButton) {
        fullscreenButton.removeEventListener("click", handleFullscreen);
      }
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <div style={{ height: '50vh', width: "50vh" }}>
      <iframe
        id="videoFrame"
        referrerpolicy="origin"
        style={{ height: '100%', width: '100%', border: 'none' }}
        src={`https://vidsrc.pro/embed/${type}/${id}`}
        title="video-frame"
        allowFullScreen
      ></iframe>
    </div>
  );
}
