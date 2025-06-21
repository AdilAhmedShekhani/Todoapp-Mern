/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, task, refresh }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    body: "",
  });

  // Pre-fill task when modal opens
  useEffect(() => {
    if (task) {
      setUpdatedTask({
        title: task.title || "",
        body: task.body || "",
      });
    }
  }, [task]);

  const change = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const updateTask = async () => {
    if (!updatedTask.title || !updatedTask.body) {
      toast.error("Title or Body cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v2/updateTask/${task._id}`,
        {
          title: updatedTask.title,
          body: updatedTask.body,
        }
      );

      if (res.data.message === "Task updated") {
        toast.success("✅ Task Updated Successfully");
        refresh(); // refresh task list in Todo.jsx
        display("none"); // close modal
      } else {
        toast.error("❌ Task Not Updated");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Server error while updating task");
    }
  };

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input
        type='text'
        name='title'
        value={updatedTask.title}
        onChange={change}
        placeholder='Title'
        className='todo-inputs my-4 w-100 p-3'
      />
      <textarea
        name='body'
        value={updatedTask.body}
        onChange={change}
        placeholder='Body'
        className='todo-inputs w-100 p-3'
      />
      <div>
        <button className='btn btn-dark my-4' onClick={updateTask}>
          Update
        </button>
        <button
          className='btn btn-danger my-4 mx-3'
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
