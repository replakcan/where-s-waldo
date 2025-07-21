import { useEffect, useState } from "react";
import "./styles/test.css";

function Test() {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState("--select target--");
  const [coords, setCoords] = useState({ x: "", y: "" });
  const [foundTargets, setFoundTargets] = useState([]);

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

  return (
    <>
      <div>
        <form action="" onSubmit={compareCoords}>
          <select
            value={currentTarget}
            name="target"
            id="target"
            onChange={handleChange}
          >
            <option value="">--select target--</option>
            {targets.map((target) => {
              return (
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
              );
            })}
          </select>
          <button type="submit">check!</button>
        </form>
      </div>
      <div className="where-is-waldo">
        <img
          onClick={handleImageClick}
          src="src/assets/wheres-waldo-beach.jpeg"
          alt=""
        />
      </div>
    </>
  );
}

export default Test;
