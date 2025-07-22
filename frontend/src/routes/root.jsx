import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import "../styles/gameboard.css";
import ResultDialogBox from "../components/result-dialog-box";

export default function Root() {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState("--select target--");
  const [coords, setCoords] = useState({ x: "", y: "" });
  const [foundTargets, setFoundTargets] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const location = useLocation();

  const isSticky = location.pathname == "/game";

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/targets");

        const targets = await res.json();

        setTargets(targets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTargets();
  }, []);

  useEffect(() => {
    if (targets.length > 0 && foundTargets.length === targets.length) {
      clearInterval(intervalId);
      setIntervalId(null);

      setShowDialog(true);
    }
  }, [foundTargets, targets, intervalId, startTime]);

  const compareCoords = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/api/targets/${currentTarget}`
      );

      const target = await res.json();

      const { bottomRightX, bottomRightY, topLeftX, topLeftY } = target;
      const { x, y } = coords;

      if (
        x < bottomRightX &&
        x > topLeftX &&
        y > topLeftY &&
        y < bottomRightY
      ) {
        console.log(`you found ${target.name}!`);

        setFoundTargets((prevState) => [...prevState, target.name]);

        setCurrentTarget("--select target--");
      } else {
        console.log("Try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCurrentTarget(e.target.value);
  };

  const handleStartClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const now = Date.now();
    setStartTime(now);
    setElapsedTime(0);
    setFoundTargets([]);

    const id = setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 1000);

    setIntervalId(id);
  };

  const handleExitGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setStartTime(null);
    setElapsedTime(0);
    setFoundTargets([]);
  };

  return (
    <section className="root-section">
      <header className={isSticky ? "sticky-header" : ""}>
        <NavLink
          to="game"
          onClick={handleStartClick}
          title={intervalId ? "Restart the game" : "Begin new game"}
        >
          {intervalId ? "RESTART" : "PLAY"}
        </NavLink>

        {startTime && (
          <>
            <form onSubmit={compareCoords}>
              <select
                value={currentTarget}
                name="target"
                id="target"
                onChange={handleChange}
              >
                <option value="">--select target--</option>
                {targets.map((target) => (
                  <option
                    className={
                      foundTargets.includes(target.name)
                        ? "found-target"
                        : "not-found-target"
                    }
                    disabled={foundTargets.includes(target.name)}
                    key={target.id}
                    value={target.id}
                  >
                    {target.name}
                  </option>
                ))}
              </select>
              <button type="submit">check!</button>
            </form>

            <div>
              Targets found: {foundTargets.length} / {targets.length}
            </div>

            <div>Time: {Math.floor(elapsedTime / 1000)} seconds</div>
          </>
        )}
        <NavLink
          onClick={handleExitGame}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="leaderboard"
        >
          Leaderboard
        </NavLink>
      </header>
      <Outlet context={{ setCoords, targets, foundTargets }} />
      {showDialog && (
        <ResultDialogBox setShowDialog={setShowDialog} startTime={startTime} />
      )}
    </section>
  );
}
