import "../styles/user-result.css";

export default function UserResult({ user }) {
  return (
    <div className="user-result">
      <p>{user.name}</p>
      <p>{user.game_time} seconds</p>
    </div>
  );
}
