import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import "../styles/gameboard.css";

export default function Root() {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState("--select target--");
  const [coords, setCoords] = useState({ x: "", y: "" });
  const [foundTargets, setFoundTargets] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/targets");

      const targets = await res.json();

      setTargets(targets);
      console.log(targets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (targets.length > 0 && foundTargets.length === targets.length) {
      clearInterval(intervalId);
      setIntervalId(null);
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      console.log("Game finished in", seconds, "seconds");
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
    navigate("/game");

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
  return (
    <section className="root-section">
      <header>
        <button
          onClick={handleStartClick}
          title={intervalId ? "Restart the game" : "Begin new game"}
        >
          {intervalId ? "Reset" : "Start the game!"}
        </button>

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
      </header>
      <Outlet context={{ setCoords, targets, foundTargets }} />
    </section>
  );
}
