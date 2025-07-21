import { useEffect, useState } from "react";
import UserResult from "../components/user-result";
import "../styles/leaderboard.css";

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3001/api/users");

      const users = await res.json();

      const orderedUsers = users.sort((a, b) => a.game_time - b.game_time);

      setUsers(orderedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <section className="leaderboard">
      {users?.map((user) => {
        return <UserResult key={user.id} user={user} />;
      })}
    </section>
  );
}
