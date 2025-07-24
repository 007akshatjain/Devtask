import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = {
    "to-do": [],
    "in-progress": [],
    "done": [],
  };

  tasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {Object.keys(columns).map((status) => (
        <div key={status} style={{ width: "30%" }}>
          <h3>{status.toUpperCase()}</h3>
          {columns[status].map((task) => (
            <div key={task._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
