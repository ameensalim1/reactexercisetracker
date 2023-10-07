import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditExercise(props) {
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/exercises/${props.match.params.id}`)
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const onDelete = () => {
    axios
      .delete(`http://localhost:3000/exercises/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        window.location = '/'; // Redirect to the exercise list after deletion.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Exercise Details</h3>
      <p>
        <strong>Username:</strong> {exercise.username}
      </p>
      <p>
        <strong>Exercise:</strong> {exercise.description}
      </p>
      <p>
        <strong>Weight:</strong> {exercise.weight}
      </p>
      <p>
        <strong>Sets:</strong> {exercise.sets}
      </p>
      <p>
        <strong>Reps:</strong> {exercise.reps}
      </p>
      <p>
        <strong>Duration:</strong> {exercise.duration} minutes
      </p>
      <p>
        <strong>Date:</strong> {new Date(exercise.date).toLocaleDateString()}
      </p>

      <button onClick={onDelete} className="btn btn-danger">
        Delete Exercise
      </button>
    </div>
  );
}

export default EditExercise;
