const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) =>{
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const weight = Number(req.body.weight);
    const sets = Number(req.body.sets);
    const reps = Number(req.body.reps);
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);


    const newExercise = new Exercise({
        username,
        description,
        weight,
        sets,
        reps,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status (400).json('Error: ' + err));
        
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {


        //handling
        if (!exercise) {
          return res.status(404).json('Exercise not found.');
        }

        // Log the received data for debugging
        console.log(req.body);

        exercise.username = req.body.username;
        exercise.description = req.body.description;

        exercise.weight = req.body.weight;
        exercise.sets = Number(req.body.sets);
        exercise.reps = Number(req.body.reps);

        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
