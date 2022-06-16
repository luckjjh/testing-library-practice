import React, { useEffect } from "react";
import axiosInstance from "./axios.instance";

const initialState = { loading: false, todos: [], error: "" };
const apiKey = "207002a5564d447292dac501ce2f71ac";
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

export const useAxios = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const fetchTodos = async () => {
    dispatch({ type: "fetch" });
    await axiosInstance
      .get(`/locations/v1/topcities/50.json?apikey=${apiKey}`)
      .then((res) => {
        dispatch({ type: "success", todos: res.data });
      })
      .catch((error) => {
        dispatch({ type: "failure", error: error.message });
      });
  };
  return [state,fetchTodos];
};

export const useLocation = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const fetchTodos = async (coords) => {
    dispatch({ type: "fetch" });
    try{
      const res = await axiosInstance
        .get(`locations/v1/cities/geoposition/search.json?q=${coords.latitude},${coords.longitude}&apikey=${apiKey}`);
      dispatch({ type: "success", todos: res.data });
    }catch(e){
      dispatch({ type: "failure", error: e.message });
    }
    
  };

  return [state,fetchTodos];
};

export const useWeather = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const fetchTodos = async (key) => {
    dispatch({ type: "fetch" });
    await axiosInstance
      .get(`/currentconditions/v1/${key}.json?apikey=${apiKey}`)
      .then((res) => {
        dispatch({ type: "success", todos: res.data });
      })
      .catch((error) => {
        dispatch({ type: "failure", error: error.message });
      });
  };

  return [state,fetchTodos];
};