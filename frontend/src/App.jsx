import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Signin from "./components/signup/Signin";
import Todo from "./components/todo/Todo";
import { authActions } from "./store";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login())
    }

  }, [])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
};

export default App;