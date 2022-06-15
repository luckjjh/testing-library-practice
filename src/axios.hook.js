import React from "react";
import axiosInstance from "./axios.instance";

const initialState = { loading: false, todos: [], error: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { ...state, loading: true };
    case "success":
      return { ...state, loading: false, todos: action.todos };
    case "failure":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const useAxios = (url) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "fetch" });
      await axiosInstance
        .get(url)
        .then((res) => {
          dispatch({ type: "success", todos: res.data });
        })
        .catch((error) => {
          dispatch({ type: "failure", error: error.message });
        });
    };
    fetchTodos();
  }, []);

  return state;
};
