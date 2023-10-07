const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true},
    description: { type: String, required: true},
    weight: { type: Number }, 
    sets: { type: Number },    
    reps: { type: Number },    
    duration: { type: Number },
    date: { type: Date, require: true},
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;