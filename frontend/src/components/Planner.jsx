import { useState } from "react";
import Todo from "./Todo";
import CalendarView from "./CalendarView";

function Planner() {
  const [view, setView] = useState("tasks");

  return (
    <div className="app">
      <div className="sidebar">
        <h2>📘 Planner</h2>
        <p onClick={() => setView("tasks")}>📝 Tasks</p>
        <p onClick={() => setView("calendar")}>📅 Calendar</p>
      </div>

      <div className="main">
        {view === "tasks" ? <Todo /> : <CalendarView />}
      </div>
    </div>
  );
}

export default Planner;