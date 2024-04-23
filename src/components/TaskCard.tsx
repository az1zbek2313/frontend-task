import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

interface TaskCardProps {
  title: string;
  tags: string[];
  handleDelete: (index: number) => void;
  index: number;
  setActiveCard: (index: number | null) => void; // setActiveCard turi o'zgartirildi
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  tags,
  handleDelete,
  index,
  setActiveCard,
}) => {
  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selectTag={() => {}} selected />
          ))}
        </div>
        <div className="task_delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete_icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
