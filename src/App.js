import React from "react";
import { useAxios, useLocation, useWeather } from "./axios.hook";

// 위치 > 날씨 API 지역 키 > 키로 날씨정보를 받아온다.
// 지역키 + 날씨정보 객체

function App() {
  const [state,fetchTodos] = useAxios();
  const [loc,setLoc] = React.useState(null);
  const [curLoc,setCurLoc] = useLocation();
  const [weather,setWeather] = useWeather();
  async function getLocation(){
      setLoc({
        latitude:37.59,
        longitude:127.065,
      })
  }

  React.useEffect(()=>{
    getLocation();
    fetchTodos();
  },[])

  React.useEffect(()=>{
    if(loc)
      setCurLoc(loc);
  },[loc]);

  React.useEffect(()=>{
    if(curLoc.todos.length!==0){
      setWeather(curLoc.todos.Key);
    }
  },[curLoc]);

  if ((state.todos.length===0) || (curLoc.todos.length===0) || (weather.todos.length===0)) {
    return <p>Loading...</p>;
  }
  if (state.error) {
    return <p>Error: {state.error}</p>;
  }
  return (
    <div className="todo" data-testid="todos">
      <div>{weather.todos[0].WeatherText}</div>
      <div>{curLoc.todos.Key}</div>
      {state.todos.map((item,idx) => (
        <div key={idx}>{item.EnglishName}</div>
      ))}
    </div>
  );
}

export default App;
