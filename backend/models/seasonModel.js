import mongoose from "mongoose";

const seasonGameSchema = new mongoose.Schema({
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  games: Number,
  goals: Number,
  valorationMedia: [Number], // Array para almacenar múltiples valores
  playerGame: Number,
  playerJourney: Number,
  yellowCards: Number,
  redCards: Number
});

const seasonGameModel = mongoose.model('seasonSchema', seasonGameSchema);

export default seasonGameModel;
