import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { Task } from "./components/types"; // Task turi import qilindi

const oldTasks = localStorage.getItem("tasks");
const initialTasks: Task[] = JSON.parse(oldTasks || "[]");

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeCard, setActiveCard] = useState<number | null>(null); // activeCard turi son bilan o'zgartirildi

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex: number) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrag = (status: string, position: number) => {
    console.log(`${activeCard} is going to into ${status} and at the position ${position}`);
    
    if (activeCard == null) return;

    const taskToMove = tasks[activeCard];
    const updateTasks = [...tasks.filter((_, index) => index !== activeCard)];
    updateTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    });

    setTasks(updateTasks);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrag}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrag}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrag}
        />
      </main>
    </div>
  );
};

export default App;
