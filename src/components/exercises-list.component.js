import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.sets}</td>
    <td>{props.exercise.reps}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <button onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</button>
    </td>
  </tr>
);

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/exercises/')
      .then(response => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:3000/exercises/${id}`)
      .then(res => {
        console.log(res.data);
        setExercises(exercises.filter(el => el._id !== id));
      });
  };

  const exerciseList = exercises.map(currentexercise => (
    <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />
  ));

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Exercises</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList}
        </tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
