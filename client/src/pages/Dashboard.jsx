import React, { useEffect, useState } from "react";
import API from "../api";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
// ...existing code...

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "to-do",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title || !newTask.description) return;

    try {
      if (newTask._id) {
        // Edit existing
        await API.put(`/tasks/${newTask._id}`, newTask);
      } else {
        // Create new
        await API.post("/tasks", newTask);
      }

      setNewTask({ title: "", description: "", status: "to-do" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating/updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // Refresh tasks
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEditTask = (task) => {
    setNewTask({
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; // Dropped outside a column
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // Dropped in same place
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (!task) return;

    try {
      await API.put(`/tasks/${draggableId}`, {
        ...task,
        status: destination.droppableId,
      });

      fetchTasks(); // Refresh UI
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login
  };

  const columns = {
    "to-do": [],
    "in-progress": [],
    done: [],
  };

  tasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">DevTasks Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Container>

        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            {Object.keys(columns).map((status) => (
              <Grid item xs={12} md={4} key={status}>
                <Typography variant="h6" gutterBottom>
                  {status.toUpperCase()}
                </Typography>

                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        minHeight: "300px",
                        backgroundColor: "#f3f3f3",
                        padding: 10,
                      }}
                    >
                      {columns[status].map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ p: 2, mb: 2 }}
                            >
                              <Typography variant="subtitle1" fontWeight="bold">
                                {task.title}
                              </Typography>
                              <Typography variant="body2">
                                {task.description}
                              </Typography>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Container>
    </>
  );
};

export default Dashboard;
