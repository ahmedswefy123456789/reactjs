import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function UsersManager() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const navigate = useNavigate();

  if (isLoading) return <div className="card">Loading...</div>;
  if (error) return <div className="card text-red-500">Error while fetching data</div>;

  return (
    <div className="users-manager card">
      <h2 className="header-users">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="li-user"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
