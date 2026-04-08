import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!text) return;

    const res = await axios.post("http://localhost:5000/tasks", {
      text,
      completed: false,
    });

    setTasks([...tasks, res.data]);
    setText("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const onDragEnd = async (result) => {
  if (!result.destination) return;

  const items = Array.from(tasks);
  const [moved] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, moved);

  setTasks(items);

  // ⭐ SAVE ORDER IN DB
  await axios.put("https://planner-app-bmys.onrender.com", {
    tasks: items
  });
};

  return (
    <div>
      <h2>✅ Tasks</h2>

      <div className="input-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="task"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{task.text}</span>
                      <button onClick={() => deleteTask(task._id)}>✖</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Todo;