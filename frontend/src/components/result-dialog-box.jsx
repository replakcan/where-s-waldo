import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/result-dialog-box.css";

export default function ResultDialogBox({ setShowDialog, startTime }) {
  const [playerName, setPlayerName] = useState("Anonymous");
  let navigate = useNavigate();

  const handleSubmitScore = async (e) => {
    e.preventDefault();

    const seconds = Math.floor((Date.now() - startTime) / 1000);

    try {
      await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName || "Anonymous",
          game_time: seconds,
        }),
      });

      setShowDialog(false);
      navigate("/leaderboard");
    } catch (error) {
      console.error("Failed to submit score", error);
    }
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <h2>Congratulations!</h2>
        <p>You found all the targets!</p>
        <form onSubmit={handleSubmitScore}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit Score</button>
        </form>
      </div>
    </div>
  );
}
