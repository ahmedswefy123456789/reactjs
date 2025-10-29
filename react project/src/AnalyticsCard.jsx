import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
const fetchPosts = async () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
const fetchTodos = async () =>
  fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json());

export default function AnalyticsCard() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (!users || !posts || !todos)
    return <div className="loading">Loading...</div>;

  const postsPerUser = users.map((u) => ({
    id: u.id,
    username: u.username,
    posts: posts.filter((p) => p.userId === u.id).length,
    completedTodos: todos.filter(
      (t) => t.userId === u.id && t.completed
    ).length,
  }));

  const mostPosts = postsPerUser.reduce((max, u) =>
    u.posts > max.posts ? u : max
  );
  const fewestPosts = postsPerUser.reduce((min, u) =>
    u.posts < min.posts ? u : min
  );
  const mostCompletedTodos = postsPerUser.reduce((max, u) =>
    u.completedTodos > max.completedTodos ? u : max
  );
  const fewestCompletedTodos = postsPerUser.reduce((min, u) =>
    u.completedTodos < min.completedTodos ? u : min
  );

  return (
    <div className="analytics-card card">
      <h2 className="header-analytics">Analytics</h2>
      <div className="more"> Number Of Users <span className="font-style">{users.length}</span></div>
      <div className="more">Most User Post<span className="font-style">{mostPosts.username}</span> ({mostPosts.posts})</div>
      <div className="more">Less User Post <span className="font-style">{fewestPosts.username}</span> ({fewestPosts.posts})</div>
      <div className="more"> Most user Completed Todos <span className="font-style">{mostCompletedTodos.username}</span> ({mostCompletedTodos.completedTodos})</div>
      <div className="more">Less user Completed Todos <span className="font-style">{fewestCompletedTodos.username}</span> ({fewestCompletedTodos.completedTodos})</div>
    </div>
  );
}