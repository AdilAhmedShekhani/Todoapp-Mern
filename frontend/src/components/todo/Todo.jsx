/** @format */

import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Update from "./Update";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  // Show textarea
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  // Input change handler
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  // Fetch tasks from DB
  const getTasks = async () => {
    const id = sessionStorage.getItem("id");
    try {
      const res = await axios.get(`http://localhost:5000/api/v2/getTask/${id}`);
      if (res.data.list) {
        setArray(res.data.list);
      } else {
        toast.info("No tasks found");
      }
    } catch (err) {
      console.error("Fetching tasks failed", err);
      toast.error("Error getting tasks");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Submit/Add task
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/v2/addTask", {
          title: Inputs.title,
          body: Inputs.body,
          email: sessionStorage.getItem("email"),
        });

        if (res.data.message === "Task saved") {
          toast.success("Your Task is Added Successfully");
          setInputs({ title: "", body: "" });
          getTasks(); // refresh task list
        } else {
          toast.error(res.data.message || "Task not saved");
        }
      } catch (err) {
        console.error("Add task error:", err);
        toast.error("Your Task was not saved. Please check again.");
      }
    }
  };

  // Delete (local only - update this if using DB delete)
  const del = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v2/deleteTask/${id}`,
        {
          data: { email: sessionStorage.getItem("email") },
        }
      );

      if (res.data.message === "Task deleted successfully") {
        toast.success("Task Deleted");
        getTasks(); // refresh list
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete task");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
          <div className='d-flex flex-column todo-input-div w-50 p-1'>
            <input
              type='text'
              placeholder='TITLE'
              className='my-2 p-2 todo-input'
              onClick={show}
              name='title'
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id='textarea'
              type='text'
              placeholder='BODY'
              name='body'
              value={Inputs.body}
              className='p-2 todo-input'
              onChange={change}
            />
          </div>
          <div className='w-50 d-flex justify-content-end my-3'>
            <button className='home-btn px-2 py-1' onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className='todo-body'>
          <div className='container-fluid'>
            <div className='row'>
              {Array &&
                Array.map((item) => (
                  <div className='col-lg-3 col-10 mx-5 my-2' key={item._id}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      fullTask={item} // 👈 ye important hai
                      delid={del}
                      display={dis}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className='todo-update ' id='todo-update'>
        <div className='container'>
          <Update display={dis} />
        </div>
      </div>
    </>
  );
};

export default Todo;
