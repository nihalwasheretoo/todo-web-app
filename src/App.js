import React, { useState, useEffect } from "react";
import {
  register,
  login,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./api";

const App = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");

  const [todos, setTodos] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const [todoIdToEdit, setTodoIdToEdit] = useState("");

  const [titleToEdit, setTitleToEdit] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleToEdit = (event) => {
    setTitleToEdit(event.target.value);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please enter valid email/password!");
    }

    await register(email, password);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter valid email/password!");
    }

    const response = await login(email, password);

    if (response.token) {
      localStorage.setItem("TODO_APP_TOKEN", response.token);

      // fetch todos

      const todos = await getTodos();
      setTodos(todos.todos);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("TODO_APP_TOKEN");
    window.location.href = "/";
  };

  const handleAddTodo = async () => {
    await addTodo(title);

    const todos = await getTodos();
    setTodos(todos.todos);
  };

  const handleEditMode = (id) => {
    setIsEditMode(true);
    setTodoIdToEdit(id);
  };

  const handleUpdate = async (id) => {
    await updateTodo(id, titleToEdit);

    const todos = await getTodos();
    setTodos(todos.todos);
    setIsEditMode(false);
    setTodoIdToEdit("");
    setTitleToEdit("");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);

    const todos = await getTodos();
    setTodos(todos.todos);
  };

  useEffect(() => {
    const execFunc = async () => {
      const todos = await getTodos();
      setTodos(todos.todos);
    };

    execFunc();
  }, []);

  return (
    <div className="root-container">
      {localStorage.getItem("TODO_APP_TOKEN") ? (
        <div>
          Create new Todo{" "}
          <input type="text" onChange={handleTitle} value={title} />
          <br />
          <button onClick={handleAddTodo}>Add Todo</button>
          <br />
          <br />
          My Todo's
          <br />
          <br />
          {todos.length
            ? todos.map((todo, index) => (
                <div key={todo._id} style={{ marginBottom: 5 }}>
                  <span>
                    {index + 1}) {todo.title}
                  </span>
                  <button
                    style={{ marginLeft: 20 }}
                    onClick={() => handleDelete(todo._id)}
                  >
                    X
                  </button>

                  {!isEditMode ? (
                    <button
                      style={{ marginLeft: 20 }}
                      onClick={() => handleEditMode(todo._id)}
                    >
                      Update
                    </button>
                  ) : isEditMode && todoIdToEdit === todo._id ? (
                    <div style={{ marginTop: 10, marginBottom: 20 }}>
                      <input
                        type="text"
                        onChange={handleTitleToEdit}
                        value={titleToEdit}
                      />

                      <button
                        style={{ marginLeft: 20 }}
                        onClick={() => handleUpdate(todo._id)}
                      >
                        Submit
                      </button>

                      <button
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          setIsEditMode(false);
                          setTodoIdToEdit("");
                          setTitleToEdit("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            : "No Todos found"}
          <br />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          Enter Email :{" "}
          <input type="text" onChange={handleEmail} value={email} />
          <br />
          <br />
          Enter Password :{" "}
          <input type="password" onChange={handlePassword} value={password} />
          <br />
          <br />
          <button onClick={handleRegister}>Register</button>
          <br />
          <br />
          Already registered? <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
