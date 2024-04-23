import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";
import { Task } from "./types";

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface TaskData {
  task: string;
  status: string;
  tags: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [taskData, setTaskData] = useState<TaskData>({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag: string): boolean => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag: string) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev: Task[]) => {
      return [...prev, {
        id: prev.length + 1, // Yangi ID ni hisoblash
        title: taskData.task,
        description: "", // Empty description
        ...taskData // Qolgan ma'lumotlar
      }];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };
  

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />

        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag("JavaScript")}
            />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkTag("React")}
            />
          </div>

          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
