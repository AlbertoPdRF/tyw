import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Workout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({ exercises: '' });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => setWorkout(response))
      .catch(() => navigate('/workouts'));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  };

  const deleteWorkout = () => {
    if (!confirm('Delete workout?')) return;

    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        alert('Workout deleted!');
        navigate('/workouts');
      })
      .catch((error) => console.log(error.message));
  };

  const exerciseList = () => {
    let exerciseList = 'No exercises available';

    if (workout.exercises.length > 0) {
      exerciseList = workout.exercises.split(', ').map((exercise, index) => (
        <li key={index} className="list-group-item">
          {exercise}
        </li>
      ));
    }

    return exerciseList;
  };

  const workoutComments = addHtmlEntities(workout.comments);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={workout.image}
          alt="Weights"
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {workout.date} {workout.target}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Exercises</h5>
              {exerciseList()}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Comments</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${workoutComments}`,
              }}
            />
          </div>
          <div className="col-sm-6 col-lg-1">
            <button
              type="button"
              className="btn custom-button"
              onClick={() => {
                console.log(workout);
                navigate('/workout', { state: workout });
              }}
            >
              Duplicate
            </button>
          </div>
          <div className="col-sm-6 col-lg-1">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteWorkout}
            >
              Delete
            </button>
          </div>
        </div>
        <Link to="/workouts" className="btn btn-link">
          Back to workouts
        </Link>
      </div>
    </div>
  );
};

export default Workout;
