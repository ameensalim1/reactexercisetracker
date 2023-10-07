import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateExercise() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  const onChangeSets = (e) => {
    setSets(e.target.value);
  };

  const onChangeReps = (e) => {
    setReps(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      weight,
      sets,
      reps,
      duration,
      date,
    };
    console.log(exercise);

    axios.post('http://localhost:3000/exercises/add', exercise)
      .then((res) => {
        console.log(res.data);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Exercise: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Weight: </label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={onChangeWeight}
          />
        </div>
        <div className="form-group">
          <label>Sets: </label>
          <input
            type="number"
            className="form-control"
            value={sets}
            onChange={onChangeSets}
          />
        </div>
        <div className="form-group">
          <label>Reps: </label>
          <input
            type="number"
            className="form-control"
            value={reps}
            onChange={onChangeReps}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
