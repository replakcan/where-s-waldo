import "../styles/user-result.css";

export default function UserResult({ user, rank }) {
  return (
    <div className="user-result">
      {rank == 0 ? (
        <img className="first-rank-medal" src="/gold_medal.png" />
      ) : rank == 1 ? (
        <img className="second-rank-medal" src="/silver_medal.png" />
      ) : rank == 2 ? (
        <img className="third-rank-medal" src="/bronze_medal.png" />
      ) : (
        <p>{rank + 1}</p>
      )}
      <p>{user.name}</p>
      <p>{user.game_time} seconds</p>
    </div>
  );
}
