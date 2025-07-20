import { useEffect, useState } from "react";
import "./styles/test.css";

function Test() {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);

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

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCoordinates({ x, y });
    console.log("Normalized: ", x.toFixed(3), y.toFixed(3));
  };

  const handleChange = (e) => {
    setCurrentTarget(e.target.value);
  };

  return (
    <div className="where-is-waldo">
      <img
        onClick={handleImageClick}
          <select name="target" id="target" onChange={handleChange}>
            <option value="">--select target--</option>
            {targets.map((target) => {
              return (
                <option key={target.id} value={target.id}>
                  {target.name}
                </option>
              );
            })}
          </select>
  );
}

export default Test;
