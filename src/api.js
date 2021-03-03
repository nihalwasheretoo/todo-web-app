// import axios from "axios";

export const register = async (email, password) => {
  try {
    const req = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("register() -> error : ", error);
  }
};

export const login = async (email, password) => {
  try {
    const req = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("login() -> error : ", error);
  }
};

export const addTodo = async (title) => {
  try {
    const req = await fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("TODO_APP_TOKEN"),
      },
      body: JSON.stringify({ title }),
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("login() -> error : ", error);
  }
};

export const updateTodo = async (todoId, title) => {
  try {
    const req = await fetch("http://localhost:8000/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("TODO_APP_TOKEN"),
      },
      body: JSON.stringify({ todoId, title }),
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("login() -> error : ", error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const req = await fetch("http://localhost:8000/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("TODO_APP_TOKEN"),
      },
      body: JSON.stringify({ todoId }),
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("login() -> error : ", error);
  }
};

export const getTodos = async (email, password) => {
  try {
    const req = await fetch("http://localhost:8000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("TODO_APP_TOKEN"),
      },
    });

    const res = await req.json();

    console.log("response : ", res);

    return res;
  } catch (error) {
    console.error("login() -> error : ", error);
  }
};
