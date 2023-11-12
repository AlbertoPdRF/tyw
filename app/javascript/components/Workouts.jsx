import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Workouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const url = '/api/v1/workouts/index';
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((res) => setWorkouts(res))
      .catch(() => navigate('/'));
  }, []);

  const allWorkouts = workouts.map((workout, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img src={workout.image} className="card-img-top" alt="Weights" />
        <div className="card-body">
          <h5 className="card-title">
            {workout.date} {workout.target}
          </h5>
          <Link to={`/workout/${workout.id}`} className="btn custom-button">
            View workout
          </Link>
        </div>
      </div>
    </div>
  ));
  const noWorkout = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No workouts yet. Why not <Link to="/workout">create one</Link>?
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Workouts</h1>
          <p className="lead text-muted">
            Here you can find all your workouts.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/workout" className="btn custom-button">
              Create new workout
            </Link>
          </div>
          <div className="row">
            {workouts.length > 0 ? allWorkouts : noWorkout}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Workouts;
