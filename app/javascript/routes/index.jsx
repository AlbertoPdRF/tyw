import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Workouts from "../components/Workouts";
import Workout from "../components/Workout";

export default (
  <Router>
    <Routes>
      <Route path="/" exact component={<Home />} />
      <Route path="/workouts" exact component={<Workouts />} />
      <Route path="/workout/:id" element={<Workout />} />
    </Routes>
  </Router>
);
