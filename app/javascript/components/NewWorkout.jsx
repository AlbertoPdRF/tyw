import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NewWorkout = () => {
  const { state: duplicatedWorkout } = useLocation();

  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [target, setTarget] = useState(duplicatedWorkout?.target || '');
  const [exercises, setExercises] = useState(
    duplicatedWorkout?.exercises || ''
  );
  const [comments, setComments] = useState(duplicatedWorkout?.comments || '');

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, '<br> <br>')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = '/api/v1/workouts/create';

    if (
      date.length == 0 ||
      target.length == 0 ||
      exercises.length == 0 ||
      comments.length == 0
    )
      return;

    const body = {
      date,
      target,
      exercises,
      comments: stripHtmlEntities(comments),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => navigate(`/workout/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new workout to your awesome workout collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="target">Date</label>
              <input
                value={date}
                type="date"
                name="date"
                id="date"
                className="form-control"
                required
                onChange={(event) => onChange(event, setDate)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="target">Target</label>
              <input
                value={target}
                type="text"
                name="target"
                id="target"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTarget)}
              />
              <small id="targetHelp" className="form-text text-muted">
                Introduce the muscle group(s) targetted.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exercises">Exercises</label>
              <input
                value={exercises}
                type="text"
                name="exercises"
                id="exercises"
                className="form-control"
                required
                onChange={(event) => onChange(event, setExercises)}
              />
              <small id="exercisesHelp" className="form-text text-muted">
                Separate each exercise with a comma and a space.
              </small>
            </div>
            <label htmlFor="comments">Comments</label>
            <textarea
              value={comments}
              className="form-control"
              id="comments"
              name="comments"
              rows="5"
              required
              onChange={(event) => onChange(event, setComments)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create
            </button>
            <Link to="/workouts" className="btn btn-link mt-3">
              Back to workouts
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewWorkout;
