import React from 'react';
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const TodoCards = ({ title, body, id, delid, display, fullTask }) => {
  return (
    <div className='p-3 todo-card'>
      <div>
        <h5>{title}</h5>
        <p className='todo-card-p'>
          {body.length > 77 ? body.substring(0, 77) + "..." : body}
        </p>
      </div>
      <div className='d-flex justify-content-around'>
        <div
          className='d-flex justify-content-around align-items-center card-icon-head px-2 py-1'
          onClick={() => display("block", fullTask)}
        >
          <RxUpdate className='card-icons' /> update
        </div>
        <div
          className='d-flex justify-content-around align-items-center card-icon-head px-2 py-1 text-danger'
          onClick={() => delid(id)}
        >
          <MdDelete className='card-icons del' /> delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
