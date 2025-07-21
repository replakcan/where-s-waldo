import { useEffect, useState } from "react";
import "./styles/test.css";

function Test() {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState("--select target--");
  const [coords, setCoords] = useState({ x: "", y: "" });
  const [foundTargets, setFoundTargets] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetchTargets();
  }, []);

  useEffect(() => {
    if (targets.length > 0 && foundTargets.length === targets.length) {
      clearInterval(intervalId);
      setIntervalId(null);
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      console.log("Game finished in", seconds, "seconds");
    }
  }, [foundTargets, targets, intervalId, startTime]);

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

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCoords({ x, y });
    console.log("Normalized: ", x.toFixed(3), y.toFixed(3));
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

  return (
    <>
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

      <main className="where-is-waldo">
        <div className="img-container">
          <img
            onClick={handleImageClick}
            src="src/assets/wheres-waldo-beach.jpeg"
            alt=""
          />

          {targets.map((target) => {
            if (!foundTargets.includes(target.name)) return null;

            return (
              <div
                key={target.id}
                className="target-box fade-in"
                style={{
                  top: `${target.topLeftY * 100}%`,
                  left: `${target.topLeftX * 100}%`,
                  width: `${
                    (target.bottomRightX + 0.01 - target.topLeftX) * 100
                  }%`,
                  height: `${
                    (target.bottomRightY + 0.01 - target.topLeftY) * 100
                  }%`,
                }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Test;
