import { useOutletContext } from "react-router";

function Gameboard() {
  const { setCoords, targets, foundTargets } = useOutletContext();

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCoords({ x, y });
    console.log("Normalized: ", x.toFixed(3), y.toFixed(3));
  };

  return (
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
  );
}

export default Gameboard;
