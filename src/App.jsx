import React, { useState } from "react";

const PlaylistApp = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newSong, setNewSong] = useState("");

  const addSong = () => {
    if (newSong.trim() !== "") {
      setPlaylist([...playlist, newSong]);
      setNewSong("");
    }
  };

  const nextSong = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const prevSong = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  const jumpToSong = (index) => {
    setCurrentIndex(index);
  };

  const removeSong = (index) => {
    const updated = playlist.filter((_, i) => i !== index);
    setPlaylist(updated);


    if (playlist.length === 1) {
      setCurrentIndex(0); 
    } else if (index < currentIndex || currentIndex >= updated.length) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "auto" }}>
      <h2>🎶 Music Playlist Manager</h2>

      {/* Add Song Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          placeholder="Enter song title"
          style={{ marginRight: "10px" }}
        />
        <button onClick={addSong}>Add Song</button>
      </div>

      {/* Playlist Display */}
      <ol>
        {playlist.map((song, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <span
              style={{
                cursor: "pointer",
                fontWeight: index === currentIndex ? "bold" : "normal",
                color: index === currentIndex ? "blue" : "black",
              }}
              onClick={() => jumpToSong(index)}
            >
              {song}
            </span>
            <button
              onClick={() => removeSong(index)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>

     
      <h3>
        Current Song:{" "}
        {playlist.length > 0 ? playlist[currentIndex] : "Playlist is empty"}
      </h3>

    
      <div style={{ marginTop: "10px" }}>
        <button onClick={prevSong} disabled={playlist.length === 0}>
          ⏮ Previous
        </button>
        <button onClick={nextSong} disabled={playlist.length === 0} style={{ marginLeft: "10px" }}>
          ⏭ Next
        </button>
      </div>
    </div>
  );
};

export default PlaylistApp;
