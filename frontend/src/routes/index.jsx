import "../styles/index-route.css";

export default function Index() {
  return (
    <div className="welcome-container">
      <div className="welcome-inner-container">
        <h1>Welcome to Where's Waldo!</h1>
        <p>Get ready for a fun photo-tagging challenge. Here’s how to play:</p>
        <ul>
          <li>
            Click the <strong>Play</strong> button to start the timer.
          </li>
          <li>
            The characters listed in the <strong>dropdown menu</strong> above
            are hidden somewhere in the image.
          </li>
          <li>
            Click anywhere on the image and select a character to check if
            you've found them.
          </li>
          <li>
            Find <strong>all targets</strong> to complete the game.
          </li>
          <li>
            Once you're done, you can <strong>submit your name</strong> to
            appear on the <strong>leaderboard</strong>.
          </li>
        </ul>
        <p>Good luck, and have fun!</p>
      </div>
    </div>
  );
}
