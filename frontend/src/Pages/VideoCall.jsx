import React, { useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      setIsOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopVideo = () => {
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    setIsOn(false);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center mt-10"
    >
      <h1 className="text-2xl font-bold mb-4">Video Call 🎥</h1>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        className="w-80 h-60 rounded-lg border dark:border-gray-700 mb-6"
      ></video>

      <div className="flex gap-4">
        {!isOn ? (
          <button
            onClick={startVideo}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <FaVideo /> Start
          </button>
        ) : (
          <>
            <button
              onClick={stopVideo}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
            >
              <FaPhoneSlash /> End
            </button>
            <button
              onClick={stopVideo}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
            >
              <FaVideoSlash /> Stop Video
            </button>
          </>
        )}
      </div>
    </Motion.div>
  );
}
