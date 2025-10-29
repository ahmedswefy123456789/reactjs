import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const fetchPosts = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const fetchTodos = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function UserDetails() {
  const { id } = useParams();

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPosts(id),
  });

  const { data: todos, isLoading: todosLoading, error: todosError } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodos(id),
  });

  const [todoState, setTodoState] = useState({});

  useEffect(() => {
    if (todos) {
      const state = {};
      todos.forEach((todo) => {
        state[todo.id] = todo.completed;
      });
      setTodoState(state);
    }
  }, [todos]);

  const toggleTodo = (todoId) => {
    setTodoState((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  if (userLoading || postsLoading || todosLoading)
    return <div className="card">Loading...</div>;

  if (userError || postsError || todosError)
    return <div className="error-load">Error while fetching data</div>;

  return (
    <div className="user-details-container">
      <div className="user-card">
        <h2 className="header-name">{user.name}</h2>
        <div className="detail-item">
          <span className="email-label">E-mail :</span> {user.email}
        </div>
        <div className="posts-section">
          <h3 className="header-post">Posts</h3>
          <ul className="list-posts">
            {posts?.map((post) => (
              <li key={post.id}>
                <span className="title-post">{post.title}</span>
                <div className="body-post">{post.body}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="header-task">Todos list (To-dos)</h3>
          <ul>
            {todos?.map((todo) => (
              <li
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className={`li-class ${
                  todoState[todo.id]
                    ? "green-bg-class"
                    : "gray-bg-class"
                }`}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
