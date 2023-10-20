import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Workouts from '../components/Workouts';
import Workout from '../components/Workout';
import NewWorkout from '../components/NewWorkout';

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/workouts" exact element={<Workouts />} />
      <Route path="/workout/:id" exact element={<Workout />} />
      <Route path="/workout" exact element={<NewWorkout />} />
    </Routes>
  </Router>
);
